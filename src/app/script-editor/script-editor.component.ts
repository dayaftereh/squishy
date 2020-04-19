import { NgModule, Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ScriptEditorService } from './service/script-editor.service';
import { Subscription } from 'rxjs';
import { PropertiesDialogChild } from '../properties-dialog/service/properties-dialog-child';

@Component({
    templateUrl: './script-editor.component.html',
    selector: 'app-script-editor',
    styleUrls: [
        './script-editor.component.scss'
    ]
})
export class ScriptEditorComponent implements OnInit, OnDestroy, PropertiesDialogChild, AfterViewInit {

    options: any

    code: string | undefined

    private editor: any

    private subscription: Subscription | undefined

    constructor(private readonly scriptExitorService: ScriptEditorService) {

    }

    visible(): void {
        /*if (this.editor) {
            this.editor.layout()
        }*/
    }

    dispose(): void {
    }

    ngAfterViewInit(): void {
        if (this.editor) {
            this.editor.layout()
        }
    }

    ngOnInit(): void {
        console.log("ngOnInit")
        this.options = {
            theme: 'vs-dark',
            language: 'javascript',
            automaticLayout: true
        }

        this.subscription = this.scriptExitorService.onOpen((script: string) => {
            this.code = script

        })
    }

    submit(): void {
        this.scriptExitorService.submit(this.code)
    }

    cancel(): void {
        this.scriptExitorService.submit(this.code)
    }

    layout(): void {
        if (this.editor) {
            this.editor.layout()
        }
    }

    onEditorInit(editor: any): void {
        this.editor = editor
    }

    ngOnDestroy(): void {
        console.log("ngOnDestroy")
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}