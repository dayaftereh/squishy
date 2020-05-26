import { AfterViewInit, Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription, UnaryFunction } from 'rxjs';
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

    options: monaco.editor.EditorOptionsType

    private editor: monaco.editor.IEditor | undefined

    private _layout: EventEmitter<monaco.editor.IDimension | undefined>

    private subscription: Subscription | undefined

    constructor() {
        this._layout = new EventEmitter<monaco.editor.IDimension | undefined>(true)
    }


    ngOnInit(): void {
        this.options = {
            theme: 'vs-dark',
            language: 'javascript',
            automaticLayout: true
        } as unknown as monaco.editor.EditorOptionsType

        this.subscription = this._layout.pipe(
            delay(100)
        ).subscribe((dimension: monaco.editor.IDimension | undefined) => {
            if (this.editor) {
                this.editor.layout(dimension)
            }
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
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }
}