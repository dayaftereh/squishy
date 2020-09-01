import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditorComponent } from 'src/app/editor/editor.component';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { Utils } from 'src/app/utils/utils';
import { ProjectGraphService } from '../../../service/project-graph.service';
import { ScriptData } from '../script.data';

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
        private readonly projectGraphService: ProjectGraphService,
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
            this.projectGraphService.emitDataChanged()
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