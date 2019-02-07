const WorkerPlugin = require('worker-plugin');

module.exports = {
    output: {
        globalObject: 'this'
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