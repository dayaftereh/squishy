import * as packageJson from '../../package.json';

export class PackageJSON {

    constructor() {

    }

    get homepage(): string {
        return packageJson.homepage
    }

    get version(): string {
        return packageJson.version
    }

    get name(): string {
        return packageJson.name
    }

    get graphVersion(): string {
        return packageJson.graphVersion
    }

}