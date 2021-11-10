import { OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import { SchemaType, TSBufferProto } from 'tsbuffer-schema';
import { TSBufferValidator } from 'tsbuffer-validator';

const INDENT_SIZE = 2;

let xx: OpenAPIV3_1.SchemaObject = {
    type: 'array',
    items: {
        type: ['string', 'integer']
    }
}

export class OpenApiUtil {

    // TODO
    static protoHelper: TSBufferValidator['protoHelper'];

    // TODO
    static tsbuffer2JsonSchema(proto: TSBufferProto): { [key: string]: OpenAPIV3.SchemaObject } {
        let output: { [key: string]: OpenAPIV3.SchemaObject } = {};

        for (let key in proto) {

        }

        return output;
    }

    // TODO
    static tsbufferSchema2JsonSchema(schema: TSBufferProto[string]): OpenAPIV3.SchemaObject {
        let output: OpenAPIV3.SchemaObject = { description: schema.comment };
        switch (schema.type) {
            case SchemaType.Boolean:
                output.type = 'boolean';
                break;
            case SchemaType.Number:
                output.type = 'number';
                break;
            case SchemaType.String:
                output.type = 'string';
                break;
            case SchemaType.Array:
                output = {
                    ...output,
                    type: 'array',
                    items: this.tsbufferSchema2JsonSchema(schema.elementType)
                }
                break;
            case SchemaType.Tuple:
                // TODO prefixItems
                throw new Error('TODO')
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
                let type = typeof schema.literal;
                if (type === 'bigint' || type === 'symbol' || type === 'function' || type === 'undefined' || schema.literal === null) {
                    throw new Error('Not support ' + type);
                }
                else if (type === undefined) {
                    output.nullable
                }
                output.type = type;
                break;
            case SchemaType.Object:
                output.type = 'object';
                break;
            case SchemaType.Interface:
            case SchemaType.Buffer:
            case SchemaType.IndexedAccess:
            case SchemaType.Reference:
            case SchemaType.Union:
            case SchemaType.Intersection:
            case SchemaType.NonNullable:
            case SchemaType.Date:
            case SchemaType.Pick:
            case SchemaType.Partial:
            case SchemaType.Omit:
            case SchemaType.Overwrite:
            case SchemaType.Custom:
        }

        return output;
    }

    static tsbufferSchema2Code(schema: TSBufferProto[string]): string {
        switch (schema.type) {
            case SchemaType.Boolean:
                return 'boolean';
            case SchemaType.Number:
                return 'number';
            case SchemaType.String:
                return 'string';
            case SchemaType.Array:
                return `Array<${this.tsbufferSchema2Code(schema.elementType)}>`
            case SchemaType.Tuple:
                return `[${schema.elementTypes.map((v, i) => this.tsbufferSchema2Code(v)
                    + (schema.optionalStartIndex !== undefined && i >= schema.optionalStartIndex ? '?' : ''))
                    .join(', ')}]`;
            case SchemaType.Enum:
                return schema.members.map(v => this.tsbufferSchema2Code({ type: 'Literal', literal: v.value })).join(' | ');
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
                let output = '{\n';
                for (let prop of flat.properties) {
                    if (prop.)
                }
                output += '}';
                return output;
            }
            case SchemaType.Buffer:
            case SchemaType.IndexedAccess:
            case SchemaType.Reference:
            case SchemaType.Union:
            case SchemaType.Intersection:
            case SchemaType.NonNullable:
            case SchemaType.Date:

            case SchemaType.Custom:
        }

        return '';
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