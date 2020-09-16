import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditorComponent } from 'src/app/editor/editor.component';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { Utils } from 'src/app/utils/utils';
import { ProjectGraphService } from '../../../service/project-graph.service';
import { TextInputData } from '../text-input.data';
import { TextInputType } from '../text-input.type';

@Component({
    templateUrl: './text-input-editor.component.html'
})
export class TextInputEditorComponent extends AbstractPropertiesDialogChildComponent implements AfterViewInit {

    textInputData: TextInputData | undefined

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
        if (this.editor && this.textInputData) {
            const type: TextInputType = this.textInputData.inputType
            this.editor.setLanguage(`${type}`)

            const content: string = this.textInputData.content || ''
            this.editor.setCode(content)
            this.changeDetectorRef.detectChanges()
        }
    }

    async submit(): Promise<void> {
        if (this.textInputData && this.editor) {
            const content: string = this.editor.getCode()
            this.textInputData.content = content

            this.emitProjectChanged()
            this.projectGraphService.emitDataChanged()
        }

        this.reset()
    }

    async cancel(): Promise<void> {
        this.reset()
    }

    private reset(): void {
        this.textInputData = undefined

        if (this.editor) {
            this.editor.setCode('')
        }
    }

    setTextInputData(textInputData: TextInputData): void {
        this.textInputData = textInputData

        if (Utils.isNullOrUndefined(this.textInputData.content)) {
            this.textInputData.content = ''
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