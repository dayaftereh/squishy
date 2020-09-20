import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EditorTypes } from './editor-types';

@Injectable()
export class EditorTypesService {

    private static URL: string = "./assets/script.d.json"

    constructor(private readonly http: HttpClient) {

    }

    private async fetchTypes(): Promise<EditorTypes> {

        const types: EditorTypes = await this.http.get<EditorTypes>(EditorTypesService.URL, {
            responseType: 'json'
        }).toPromise()

        return types
    }

    async injectTypes(): Promise<void> {
        const types: EditorTypes = await this.fetchTypes()
        const files: string[] = Object.keys(types)

        files.forEach((file: string) => {
            file = file.replace(/\\/g, "/")
            const content: string = types[file]
            const path: string = `file:///node_modules/@types/${file}`;

            console.log(path, content)

            monaco.languages.typescript.javascriptDefaults.addExtraLib(
                content,
                path
            );
        })

        console.log(monaco.languages.typescript.javascriptDefaults.getExtraLibs())
    }

}