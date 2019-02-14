const WorkerPlugin = require('worker-plugin');

module.exports = {
    output: {
        globalObject: 'self'
    },
    plugins: [
        new WorkerPlugin({
            plugins: [
                'AngularCompilerPlugin'
            ]
        })
    ]
};