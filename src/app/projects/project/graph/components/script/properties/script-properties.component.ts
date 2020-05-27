import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { AbstractPropertiesDialogChildComponent } from 'src/app/properties-dialog/service/abstract-properties-dialog-child.component';
import { Utils } from 'src/app/utils/utils';
import { ScriptData } from '../script.data';

@Component({
    templateUrl: './script-properties.component.html'
})
export class ScriptPropertiesComponent extends AbstractPropertiesDialogChildComponent {

    scriptData: ScriptData | undefined

    constructor(
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly projectsService: ProjectsService,
    ) {
        super(activatedRoute, projectsService)
    }

    createFormGroup(): FormGroup {
        return new FormGroup({
            name: new FormControl()
        })
    }

    async submit(): Promise<void> {
        if (Utils.isNullOrUndefined(this.scriptData)) {
            return
        }

        this.scriptData.name = this.getFormValue('name', this.scriptData.name)

        this.emitProjectChanged()
    }


    setScriptData(scriptData: ScriptData): void {
        this.scriptData = scriptData;

        if (!Utils.isNullOrUndefined(this.formGroup)) {
            this.formGroup.patchValue(scriptData)
        }
    }

}