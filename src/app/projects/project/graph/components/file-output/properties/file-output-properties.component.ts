import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { Utils } from 'src/app/utils/utils';
import { ProjectGraphService } from '../../../service/project-graph.service';
import { FileOutputData } from '../file-output.data';

@Component({
    templateUrl: './file-output-properties.component.html'
})
export class FileOutputPropertiesComponent extends AbstractPropertiesDialogChildComponent {

    fileOutputData: FileOutputData | undefined

    constructor(
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly projectsService: ProjectsService,
        private readonly projectGraphService: ProjectGraphService
    ) {
        super(activatedRoute, projectsService)
    }

    protected createFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl(),
            filename: new FormControl(),
        })
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.fileOutputData)) {
            return
        }

        // get changed values
        this.fileOutputData.name = this.getFormValue('name', this.fileOutputData.name)
        this.fileOutputData.filename = this.getFormValue('filename', this.fileOutputData.filename)

        // notify about project changed
        this.emitProjectChanged()
        this.projectGraphService.emitDataChanged()
    }

    setFileOutputData(fileOutputData: FileOutputData): void {
        this.fileOutputData = fileOutputData;

        if (!Utils.isNullOrUndefined(this.formGroup)) {
            this.formGroup.patchValue(fileOutputData)
        }
    }

}