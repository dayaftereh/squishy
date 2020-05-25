import { Component, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { PropertiesDialogChild } from 'src/app/properties-dialog/service/properties-dialog-child';
import { ScriptData } from '../script.data';
import { EditorComponent } from 'src/app/editor/editor.component';
import { Utils } from 'src/app/utils/utils';
import { PropertiesDialogServiceEvent } from 'src/app/properties-dialog/service/properties-dialog-service.event';

@Component({
    templateUrl: './script-editor.component.html'
})
export class ScriptEditorComponent implements PropertiesDialogChild, AfterViewInit {

    scriptData: ScriptData | undefined

    @ViewChild('editor')
    editor: EditorComponent | undefined

    constructor(private changeDetectorRef: ChangeDetectorRef) {

    }

    ngAfterViewInit(): void {
        // set the script to the editor
        if (this.editor && this.scriptData) {
            this.editor.setCode(this.scriptData.script)
            this.changeDetectorRef.detectChanges()
        }
    }

    async submit(): Promise<void> {
        if (this.scriptData && this.editor) {
            const script: string = this.editor.getCode()
            this.scriptData.script = script
        }
        this.reset()
    }

    async cancel(): Promise<void> {
        this.reset()
    }

    private reset(): void {
        this.scriptData = undefined

        if (this.editor) {
            this.editor.setCode('')
        }
    }

    setScriptData(scriptData: ScriptData): void {
        this.scriptData = scriptData
        // check if script is not undefined
        if (Utils.isNullOrUndefined(this.scriptData.script)) {
            this.scriptData.script = ''
        }
    }

    resized(): void {
        if (this.editor) {
            this.editor.layout()
        }
    }

}