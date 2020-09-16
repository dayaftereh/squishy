import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    templateUrl: './editor.component.html',
    selector: 'app-editor',
    styleUrls: [
        './editor.component.scss'
    ]
})
export class EditorComponent implements OnInit, AfterViewInit, OnDestroy {

    code: string | undefined

    options: monaco.editor.IEditorOptions

    private editor: monaco.editor.IEditor | undefined

    private _layout: EventEmitter<monaco.editor.IDimension | undefined>

    private _content: EventEmitter<string | undefined>

    private subscription: Subscription | undefined

    constructor() {
        this._content = new EventEmitter<string | undefined>(true)
        this._layout = new EventEmitter<monaco.editor.IDimension | undefined>(true)
    }


    ngOnInit(): void {
        this.options = {
            theme: 'vs-dark',
            language: 'javascript',
            automaticLayout: true
        } as unknown as monaco.editor.IEditorOptions

        this.subscription = this._layout.pipe(
            delay(100)
        ).subscribe((dimension: monaco.editor.IDimension | undefined) => {
            if (this.editor) {
                this.editor.layout(dimension)
            }
        })
    }

    setLanguage(language: string): void {
        this.options = Object.assign({}, this.options, {
            language
        })
    }

    ngAfterViewInit(): void {
        this.layout()
    }

    layout(dimension?: monaco.editor.IDimension): void {
        this._layout.emit(dimension)
    }

    setCode(code: string): void {
        this.code = code
    }

    getCode(): string {
        return this.code
    }

    onEditorInit(editor: monaco.editor.IEditor): void {
        this.editor = editor
        this.layout()
    }

    onChange(content: string | undefined): void {
        if (this._content) {
            this._content.emit(content)
        }
    }

    onContentChanged(fn: (content: string) => void): Subscription {
        return this._content.subscribe(fn)
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }
}