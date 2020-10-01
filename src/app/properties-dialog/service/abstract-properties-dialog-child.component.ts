import { EventEmitter, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { FormUtils } from 'src/app/utils/form-utils';
import { Utils } from 'src/app/utils/utils';
import { PropertiesDialogChild } from './properties-dialog-child';

@Injectable()
export abstract class AbstractPropertiesDialogChildComponent implements OnInit, OnDestroy, PropertiesDialogChild {

    formGroup: FormGroup | undefined

    project: SquishyProject | undefined

    protected events: {
        submit: EventEmitter<void> | undefined
        cancel: EventEmitter<void> | undefined
    }

    protected subscriptions: Subscription[]

    constructor(
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly projectsService: ProjectsService,
    ) {
        this.init()
        this.events = {
            submit: undefined,
            cancel: undefined
        }
        this.subscriptions = []
    }

    private init(): void {
        this.formGroup = this.createFormGroup()
    }

    protected abstract createFormGroup(): FormGroup

    ngOnInit(): void {
        const projectSubscription: Subscription = this.projectsService.getProjectFromRoute(this.activatedRoute).subscribe((project: SquishyProject | undefined) => {
            this.project = project
        })

        this.subscriptions.push(projectSubscription)
    }

    protected getFormValue<T>(name: string, defaultValue: T): T {
        const value: T = FormUtils.getFormValue(this.formGroup, name, defaultValue)
        return value
    }

    protected setFromDisabled(name: string, disabled: boolean, emitEvent?: boolean): void {
        FormUtils.setFromDisabled(this.formGroup, name, disabled, emitEvent)
    }

    triggerSubmit(): void {
        if (Utils.isNullOrUndefined(this.events) || Utils.isNullOrUndefined(this.events.submit)) {
            return
        }
        this.events.submit.next()
    }

    abstract submit(): Promise<void>

    async cancel(): Promise<void> {

    }

    resized(width: number, height: number): void {
    }

    protected emitProjectChanged(): void {
        if (!Utils.isNullOrUndefined(this.project)) {
            this.projectsService.update(this.project)
        }
    }

    inject(submit: EventEmitter<void>, cancel: EventEmitter<void>): void {
        this.events = {
            submit,
            cancel
        }
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription: Subscription) => {
                subscription.unsubscribe()
            })
        }

    }

}