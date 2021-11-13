import { OpenAPIV3 } from 'openapi-types';
import { SchemaType, TSBufferProto, TSBufferSchema } from 'tsbuffer-schema';
import { TSBufferValidator } from 'tsbuffer-validator';
import { ServiceProto } from 'tsrpc-proto';
import { processString } from 'typescript-formatter';
import { ApiService, ServiceMapUtil } from './ServiceMapUtil';
import { TsrpcApi } from './TsrpcApi';

// https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md
// https://tools.ietf.org/html/draft-bhutton-json-schema-00#section-4.2.1

export class ApiDocUtil {

    static protoHelper: TSBufferValidator['protoHelper'];

    static toOpenAPI(proto: ServiceProto<any>): OpenAPIV3.Document {
        let generator = new TSBufferValidator(proto.types);
        this.protoHelper = generator.protoHelper;

        // schemas
        let schemas: NonNullable<OpenAPIV3.ComponentsObject['schemas']> = {};
        for (let key in proto.types) {
            schemas[key.replace(/[\.\/]/g, '_')] = this.toSchemaObject(proto.types[key]);
        }
        schemas['ApiError'] = {
            type: 'object',
            title: 'API 错误',
            description: '业务错误（ApiError）返回 HTTP 状态码 200，其它错误返回 HTTP 状态码 500',
            properties: {
                isSucc: {
                    type: 'boolean',
                    enum: [false],
                    default: false
                },
                err: {
                    type: 'object',
                    description: 'TsrpcError',
                    properties: {
                        message: {
                            type: 'string'
                        },
                        type: {
                            type: 'string',
                            enum: ['ApiError', 'NetworkError', 'ServerError', 'ClientError']
                        },
                        code: {
                            oneOf: [
                                { type: 'string' },
                                { type: 'integer' }
                            ],
                            nullable: true
                        }
                    },
                    required: ['message', 'type']
                }
            }
        }

        let apiSvcs = Object.values(ServiceMapUtil.getServiceMap(proto).apiName2Service) as ApiService[];
        let pathObj: OpenAPIV3.PathsObject = Object.fromEntries(apiSvcs.map(v => {
            let nameArr = v.name.split('/');
            let lastName = nameArr.last()!;
            let tags = nameArr.length > 1 ? [nameArr.slice(0, nameArr.length - 1).join('/')] : undefined;

            let pathValue: OpenAPIV3.PathItemObject = {
                post: {
                    tags: tags,
                    description: (schemas[v.reqSchemaId] as OpenAPIV3.SchemaObject)?.description,
                    operationId: v.name,
                    requestBody: {
                        description: `Req<${lastName}>`,
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/' + v.reqSchemaId.replace(/[\.\/]/g, '_')
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Success',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        description: `ApiReturn<Res${lastName}>`,
                                        properties: {
                                            isSucc: {
                                                type: 'boolean',
                                                enum: [true],
                                                default: true
                                            },
                                            res: {
                                                $ref: '#/components/schemas/' + v.resSchemaId.replace(/[\.\/]/g, '_')
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: 'Error',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ApiError'
                                    }
                                }
                            }
                        }
                    }
                }
            };
            return ['/' + v.name, pathValue];
        }));

        let output: OpenAPIV3.Document = {
            openapi: '3.0.0',
            info: {
                title: 'TSRPC Open API',
                version: '1.0.0'
            },
            paths: pathObj,
            components: {
                schemas: schemas
            }
        };
        return output;
    }

    static toSchemaObject(schema: TSBufferProto[string]): OpenAPIV3.SchemaObject {
        let output: OpenAPIV3.SchemaObject = {};

        switch (schema.type) {
            case SchemaType.Boolean:
                output.type = 'boolean';
                break;
            case SchemaType.Number:
                if (schema.scalarType && schema.scalarType.indexOf('int') > -1) {
                    output.type = 'integer';
                }
                else {
                    output.type = 'number';
                }
                break;
            case SchemaType.String:
                output.type = 'string';
                break;
            case SchemaType.Array:
                output = {
                    ...output,
                    type: 'array',
                    items: this.toSchemaObject(schema.elementType)
                }
                break;
            case SchemaType.Tuple:
                output = {
                    ...output,
                    type: 'array',
                    prefixItems: schema.elementTypes.map(v => this.toSchemaObject(v)) as OpenAPIV3.SchemaObject[]
                } as any
                break;
            case SchemaType.Enum:
                if (schema.members.every(v => typeof v.value === 'string')) {
                    output.type = 'string';
                }
                else if (schema.members.every(v => typeof v.value === 'number')) {
                    output.type = 'number';
                }
                else {
                    output.oneOf = [{ type: 'string' }, { type: 'number' }]
                }
                output.enum = schema.members.map(v => v.value);
                break;
            case SchemaType.Any:
                output.type = 'object';
                break;
            case SchemaType.Literal:
                if (schema.literal === null) {
                    output.nullable = true;
                    break;
                }

                let type = typeof schema.literal;
                if (type === 'bigint' || type === 'symbol' || type === 'function' || type === 'undefined') {
                    break;
                }
                output.type = type;
                output.enum = [schema.literal];
                break;
            case SchemaType.Object:
                output.type = 'object';
                break;
            case SchemaType.Interface: {
                output.type = 'object';

                // properties
                if (schema.properties) {
                    let schemaProperties: NonNullable<(typeof schema)['properties']> = Object.merge([], schema.properties);
                    output.properties = Object.fromEntries(schemaProperties.map(property => {
                        // A | null | undefined -> A?
                        if (property.type.type === SchemaType.Union) {
                            let members = property.type.members.filter(v => !(v.type.type === SchemaType.Literal && v.type.literal == null));
                            if (members.length !== property.type.members.length) {
                                property.optional = true;
                                if (members.length === 1) {
                                    property.type = members[0].type;
                                }
                                else {
                                    property.type.members = members;
                                }
                            }
                        }
                        return [property.name, this.toSchemaObject(property.type)]
                    }));

                    output.required = schemaProperties.filter(v => !v.optional).map(v => v.name);
                    if (output.required.length === 0) {
                        output.required = undefined;
                    }
                }
                else {
                    output.properties = {};
                }

                // index signature
                if (schema.indexSignature) {
                    output.additionalProperties = this.toSchemaObject(schema.indexSignature.type);
                }

                // extends
                if (schema.extends) {
                    output = {
                        allOf: [
                            ...schema.extends.map(v => this.toSchemaObject(v.type)),
                            output
                        ]
                    }
                }

                break;
            }
            case SchemaType.Buffer:
                output.type = 'string';
                output.format = 'base64';
                break;
            case SchemaType.IndexedAccess: {
                let parsed = this.protoHelper.parseReference(schema);
                output = {
                    ...output,
                    ...this.toSchemaObject(parsed)
                }
                break;
            }
            case SchemaType.Reference:
                (output as any).$ref = '#/components/schemas/' + schema.target.replace(/[\.\/]/g, '_');
                break;
            case SchemaType.Union: {
                let members = schema.members.filter(v => {
                    let type = v.type;
                    return !(type.type === SchemaType.Literal && type.literal == null)
                });

                // null | undefined
                if (members.length === 0) {
                    output.nullable = true;
                    break;
                }
                // A | null | undefined
                else if (members.length === 1) {
                    output = this.toSchemaObject(members[0].type);
                }
                // >= 2 members
                else {
                    // Check if discriminator
                    // Every member is interface
                    let flats = members.map(v => this.protoHelper.isInterface(v.type) ? this.protoHelper.getFlatInterfaceSchema(v.type) : null);
                    if (flats.every(v => !!v)) {
                        // Every member has a same literal property
                        flats[0]?.properties.some(disProp => {
                            let literalTypes = flats.map(f => {
                                let prop = f?.properties.find(v => v.name === disProp.name);
                                if (!prop || prop.type.type !== SchemaType.Literal || prop.optional) {
                                    return null;
                                }
                                return prop.type;
                            })
                            // Every literal value is different
                            if (literalTypes.every(v => !!v)) {
                                let uniqueLiterals = literalTypes.map(v => v!.literal).distinct();
                                if (uniqueLiterals.length === literalTypes.length) {
                                    // Yes! This is the discriminator key
                                    output.oneOf = members.map(v => this.toSchemaObject(v.type));
                                    output.discriminator = {
                                        propertyName: disProp.name,
                                        // mapping: Object.fromEntries(flats.map((v, i) => {
                                        //     let lProp = v!.properties.find(v1 => v1.name === disProp.name)!;
                                        //     let lType = lProp.type as LiteralTypeSchema;
                                        //     return [lType.literal, this.toSchemaObject(members[i].type)]
                                        // }))
                                    }
                                }
                            }
                        })
                    }

                    // Not discriminator: anyOf
                    if (!output.discriminator) {
                        let anyOf = members.map(v => JSON.stringify(this.toSchemaObject(v.type))).distinct().map(v => JSON.parse(v));
                        if (anyOf.length > 1) {
                            output.anyOf = anyOf;
                        }
                        else {
                            output = anyOf[0];
                        }
                    }
                }

                // X | null
                if (members.length !== schema.members.length) {
                    output.nullable = true;
                }
                break;
            }
            case SchemaType.Intersection:
                output.allOf = schema.members.map(v => this.toSchemaObject(v.type));
                break;
            case SchemaType.NonNullable:
                output = this.toSchemaObject(schema.target);
                output.nullable = false;
                break;
            case SchemaType.Date:
                output.type = 'string';
                output.format = 'date-time';
                break;
            case SchemaType.Pick:
            case SchemaType.Partial:
            case SchemaType.Omit:
            case SchemaType.Overwrite: {
                let parsed = this.protoHelper.parseMappedType(schema);
                output = this.toSchemaObject(parsed);
                break;
            }
            case SchemaType.Custom:
                output.type = 'string';
                break;
        }

        output.description = schema.comment;
        return output;
    }

    static toCode(schema: TSBufferProto[string]): string {
        switch (schema.type) {
            case SchemaType.Boolean:
                return 'boolean';
            case SchemaType.Number:
                return 'number';
            case SchemaType.String:
                return 'string';
            case SchemaType.Array:
                let elemType = this.protoHelper.isTypeReference(schema.elementType) ? this.protoHelper.parseReference(schema.elementType) : schema.elementType;
                let code = this.toCode(elemType);
                return (elemType.type === SchemaType.Union || elemType.type === SchemaType.Intersection) ? `(${code})[]` : `${code}[]`;
            case SchemaType.Tuple:
                return `[${schema.elementTypes.map((v, i) => this.toCode(v)
                    + (schema.optionalStartIndex !== undefined && i >= schema.optionalStartIndex ? '?' : ''))
                    .join(', ')}]`;
            case SchemaType.Enum:
                return schema.members.map(v => this.toCode({ type: 'Literal', literal: v.value })).join(' | ');
            case SchemaType.Any:
                return 'any';
            case SchemaType.Literal:
                if (schema.literal === undefined) {
                    return 'undefined';
                }
                return JSON.stringify(schema.literal);
            case SchemaType.Object:
                return 'object';
            case SchemaType.Pick:
            case SchemaType.Partial:
            case SchemaType.Omit:
            case SchemaType.Overwrite:
            case SchemaType.Interface: {
                let flat = this.protoHelper.getFlatInterfaceSchema(schema);
                let props: string[] = [];
                for (let prop of flat.properties) {
                    props.push(`${prop.type.comment ? `${this.toCodeComment(prop.type.comment)}\n` : ''}${prop.name}${prop.optional ? '?' : ''}: ${this.toCode(prop.type)}`);
                }
                if (flat.indexSignature) {
                    props.push(`[key: ${flat.indexSignature.keyType.toLowerCase()}]: ${this.toCode(flat.indexSignature.type)}`)
                }

                return props.length > 1 ? `{\n${props.join(',\n')}\n}` : `{${props.join(', ')}}`
            }
            case SchemaType.Buffer:
                return 'string';
            case SchemaType.IndexedAccess:
            case SchemaType.Reference: {
                let parsed = this.protoHelper.parseReference(schema);
                return this.toCode(parsed);
            }
            case SchemaType.Union:
                return schema.members.map(v => {
                    let parsed = this.protoHelper.isTypeReference(v.type) ? this.protoHelper.parseReference(v.type) : v.type;
                    let code = this.toCode(parsed);
                    return parsed.type === SchemaType.Intersection ? `(${code})` : code;
                }).join(' | ');
            case SchemaType.Intersection:
                return schema.members.map(v => {
                    let parsed = this.protoHelper.isTypeReference(v.type) ? this.protoHelper.parseReference(v.type) : v.type;
                    let code = this.toCode(parsed);
                    return parsed.type === SchemaType.Union ? `(${code})` : code;
                }).join(' & ');
            case SchemaType.NonNullable:
                return `NonNullable<${this.toCode(schema.target)}>`;
            case SchemaType.Date:
                return 'string';
            case SchemaType.Custom:
                return 'string';
        }

        return '';
    }

    static async toTsrpcApi(proto: ServiceProto): Promise<TsrpcApi> {
        let output: TsrpcApi = {
            version: '1.0.0',
            servers: ['http://localhost:3000'],
            apis: [],
            schemas: {}
        };

        // Schema
        for (let key in proto.types) {
            let schema = proto.types[key];
            let basename = key.split('/').last()!;
            output.schemas[key] = {
                ts: await this._formatTsCode(schema, basename)
            }
        }

        // API
        let apiSvcs = Object.values(ServiceMapUtil.getServiceMap(proto).apiName2Service) as ApiService[];
        for (let api of apiSvcs) {
            let basename = api.name.split('/').last()!;
            output.apis.push({
                path: '/' + api.name,
                title: proto.types[api.reqSchemaId].comment,
                req: {
                    ts: await this._formatTsCode(proto.types[api.reqSchemaId], `Req${basename}`),
                },
                res: {
                    ts: await this._formatTsCode(proto.types[api.resSchemaId], `Res${basename}`),
                }
            })
        }

        return output;
    }

    private static async _formatTsCode(schema: TSBufferSchema, basename: string) {
        let code = this.toCode(schema);
        code = `${this.protoHelper.isInterface(schema) ? `interface Req${basename}` : `type Req${basename} =`} ${code}`;
        let format = await processString('a.ts', code, {} as any);
        return format.dest;
    }

    /** 将 TSBufferProto 的 comment 还原为代码注释 */
    static toCodeComment(comment: string,) {
        let arr = comment.split('\n');
        if (arr.length === 1) {
            return `/** ${comment} */`;
        }
        else {
            return `/**
${arr.map(v => `* ${v}`).join('\n')}
*/`
        }
    }

}