const WorkerPlugin = require('worker-plugin');

module.exports = {
    output: {
        globalObject: 'self'
    },
    module: {
        rules: []
    },
    plugins: [
        new WorkerPlugin({
            plugins: ['AngularCompilerPlugin']
        })
    ]
};