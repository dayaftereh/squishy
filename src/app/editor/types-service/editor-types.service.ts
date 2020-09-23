import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditorTypes } from './editor-types';

@Injectable()
export class EditorTypesService {

    private static URL: string = "./assets/scripts.d.ts"

    constructor(private readonly http: HttpClient) {

    }

    private async fetchTypes(): Promise<EditorTypes> {

        const types: EditorTypes = await this.http.get<EditorTypes>(EditorTypesService.URL, {
            responseType: 'json'
        }).toPromise()

        return types
    }

    private async fetchTypesString(): Promise<string> {

        const content: string = await this.http.get(EditorTypesService.URL, {
            responseType: 'text'
        }).toPromise()

        return content
    }

    private async addExtraLib(content: string, path: string): Promise<void> {
        monaco.languages.typescript.javascriptDefaults.addExtraLib(content, path);
    }

    async injectTypes(): Promise<void> {
        const scriptTypes: string = await this.fetchTypesString()
        await this.addExtraLib(scriptTypes, 'scripts.d.ts')

        console.log(monaco.languages.typescript.javascriptDefaults.getExtraLibs())
    }

}