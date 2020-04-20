import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './script-editor.component.html',
    selector: 'app-script-editor',
    styleUrls: [
        './script-editor.component.scss'
    ]
})
export class ScriptEditorComponent implements OnInit, AfterViewInit {

    code: string | undefined

    options: monaco.editor.EditorOptionsType

    private editor: monaco.editor.IEditor | undefined

    constructor() {

    }

    ngAfterViewInit(): void {
        this.layout()
    }

    ngOnInit(): void {
        this.options = {
            theme: 'vs-dark',
            language: 'javascript',
            automaticLayout: true
        } as unknown as monaco.editor.EditorOptionsType
    }

    layout(): void {
        if (this.editor) {
            this.editor.layout()
        }
    }

    setCode(code: string): void {
        this.code = code
    }

    getCode(): string {
        return this.code
    }

    onEditorInit(editor: monaco.editor.IEditor): void {
        this.editor = editor
    }

}