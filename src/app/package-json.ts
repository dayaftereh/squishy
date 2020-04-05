import * as packageJson from '../../package.json';

export class PackageJSON {

    get version(): string {
        return packageJson.version
    }

    get name(): string {
        return packageJson.name
    }

}