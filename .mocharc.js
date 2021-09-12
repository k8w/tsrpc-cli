module.exports = {
    require: [
        'ts-node/register',
    ],
    spec: [
        './test/cases/proto.test.ts',
        './test/cases/sync.test.ts',
        './test/cases/link.test.ts',
    ],
    exit: true,
    // fgrep: 'without config'
}