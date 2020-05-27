import { Component, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { PropertiesDialogChild } from 'src/app/properties-dialog/service/properties-dialog-child';
import { ScriptData } from '../script.data';
import { EditorComponent } from 'src/app/editor/editor.component';
import { Utils } from 'src/app/utils/utils';
import { PropertiesDialogServiceEvent } from 'src/app/properties-dialog/service/properties-dialog-service.event';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { FormGroup } from '@angular/forms';

@Component({
    templateUrl: './script-editor.component.html'
})
export class ScriptEditorComponent extends AbstractPropertiesDialogChildComponent implements AfterViewInit {

    scriptData: ScriptData | undefined

    @ViewChild('editor')
    editor: EditorComponent | undefined

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly projectsService: ProjectsService,
    ) {
        super(activatedRoute, projectsService)
    }

    createFormGroup(): FormGroup {
        return new FormGroup({})
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

            this.emitProjectChanged()
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

    resized(width: number, height: number): void {
        if (this.editor) {
            this.editor.layout({
                width,
                height
            })
        }
    }

}