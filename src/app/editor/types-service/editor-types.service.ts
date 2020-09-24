import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class EditorTypesService {

    private static URL: string = "./assets/scripts.d.ts"
    private static LIB_PATH: string = 'ts:types/scripts.d.ts'

    constructor(private readonly http: HttpClient) {

    }

    private async fetchTypes(): Promise<string> {
        const content: string = await this.http.get(EditorTypesService.URL, {
            responseType: 'text'
        }).toPromise()
        return content
    }

    private async isExtraLibLoaded(path: string): Promise<boolean> {
        const libs: monaco.languages.typescript.IExtraLibs = monaco.languages.typescript.javascriptDefaults.getExtraLibs()
        const lib: monaco.languages.typescript.IExtraLib | undefined = libs[path];
        return lib !== undefined && lib !== null
    }

    private async addExtraLib(content: string, path: string): Promise<void> {
        monaco.languages.typescript.javascriptDefaults.addExtraLib(content, path);
    }

    async injectTypes(): Promise<void> {
        // check if already loaded
        const loaded: boolean = await this.isExtraLibLoaded(EditorTypesService.LIB_PATH)
        if (loaded) {
            return
        }

        // load the types from server
        const scriptTypes: string = await this.fetchTypes()
        // add the lib to editor
        await this.addExtraLib(scriptTypes, EditorTypesService.LIB_PATH)
    }

}