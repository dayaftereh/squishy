const packageJSON = require('../../package.json');

export const environment = {
    production: true,
    release: new Date(),
    version: !packageJSON ? undefined : packageJSON.version
};
