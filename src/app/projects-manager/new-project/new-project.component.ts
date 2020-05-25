import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { PropertiesDialogChild } from 'src/app/properties-dialog/service/properties-dialog-child';
import { FromUtils } from 'src/app/utils/form-utils';

@Component({
    templateUrl: './new-project.component.html'
})
export class NewProjectComponent implements PropertiesDialogChild {

    formGroup: FormGroup | undefined

    constructor(private readonly projectsService: ProjectsService) {
        this.initFormGroup()
    }

    private initFormGroup(): void {
        this.formGroup = new FormGroup({
            name: new FormControl()
        })
    }

    async submit(): Promise<void> {
        const name: string = FromUtils.getFormValue(this.formGroup, 'name', 'Noname')
        this.projectsService.create(name)
    }

    async cancel(): Promise<void> {

    }

    resized(): void {

    }

}