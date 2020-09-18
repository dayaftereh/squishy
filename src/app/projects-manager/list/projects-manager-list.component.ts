import { AfterViewInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SelectItem } from 'primeng/api/selectitem';
import { Listbox } from 'primeng/listbox';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
import { Downloader } from 'src/app/utils/downloader';
import { TouchHoldEventHandler } from 'src/app/utils/touch-hold-event.handler';
import { Utils } from 'src/app/utils/utils';
import { NewProjectComponent } from '../new-project/new-project.component';

@Component({
    templateUrl: './projects-manager-list.component.html',
    selector: 'app-projects-manager-list',
    styleUrls: [
        './projects-manager-list.component.scss'
    ]
})
export class ProjectsManagerListComponent implements OnInit, AfterViewInit, OnDestroy {

    @Output()
    onProject: EventEmitter<SquishyProject>

    projects: SelectItem[] | undefined

    selection: SquishyProject[] | undefined

    private subscriptions: Subscription[]

    @ViewChild('listBox')
    listBox: Listbox | undefined

    private touchHoldEventHandler: TouchHoldEventHandler

    constructor(
        private readonly projectsService: ProjectsService,
        private readonly translateService: TranslateService,
        private readonly confirmationService: ConfirmationService,
        private readonly propertiesDialogService: PropertiesDialogService,
    ) {
        this.subscriptions = []
        this.onProject = new EventEmitter<SquishyProject>(true);
    }

    ngOnInit(): void {
        const subscription: Subscription = this.projectsService.projects()
            .pipe(
                map((projects: { [key: string]: SquishyProject }) => {
                    return Utils.mapProperties(projects, (value: SquishyProject) => {
                        return value
                    })
                }),
                map((projects: SquishyProject[]) => {
                    // convert projects to select items
                    return projects.map((project: SquishyProject) => {
                        return {
                            label: project.name,
                            value: project
                        } as SelectItem
                    })
                })
            )
            .subscribe((projects: SelectItem[]) => {
                this.projects = projects
            })

        this.subscriptions.push(subscription)
    }

    ngAfterViewInit(): void {
        const elementRef: ElementRef = this.listBox.el
        this.touchHoldEventHandler = new TouchHoldEventHandler(elementRef)
        this.touchHoldEventHandler.register()

        const subscription: Subscription = this.touchHoldEventHandler.subscribe(async (event: TouchEvent) => {
            await this.onTouched()
        })
        this.subscriptions.push(subscription)
    }

    async onTouched(): Promise<void> {
        if (!this.selection || this.selection.length < 1) {
            return
        }

        const project: SquishyProject = this.selection[0]

        // check if on project given
        if (this.onProject) {
            // notify about selected project
            this.onProject.emit(project)
        }
    }

    async onDblClick(event: any): Promise<void> {
        // check if event fired and select item
        if (Utils.isNullOrUndefined(event) || Utils.isNullOrUndefined(event.option)) {
            return
        }
        const option: SelectItem = event.option as SelectItem

        // check if the selection has a project
        if (Utils.isNullOrUndefined(option.value)) {
            return
        }
        // get the project
        const project: SquishyProject = option.value as SquishyProject

        // check if on project given
        if (this.onProject) {
            // notify about selected project
            this.onProject.emit(project)
        }
    }

    async createProject(): Promise<void> {
        const title: string = await this.translateService.get('project-manager.new-project.header').toPromise()

        // open the properties dialog with the new project component
        this.propertiesDialogService.open({
            component: NewProjectComponent,
            title,
            onInit: (component: NewProjectComponent) => {

            }
        })
    }

    async deleteProjects(): Promise<void> {
        // check if a project is selected
        if (!this.selection) {
            return
        }

        // get header and message for confirmation dialog
        const header: string = await this.translateService.get('project-manager.list.delete-dialog.header').toPromise()
        const message: string = await this.translateService.get('project-manager.list.delete-dialog.message').toPromise()

        // open confirm dialog
        this.confirmationService.confirm({
            header,
            message,
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteCurrentSelection()
            }
        })
    }

    private deleteCurrentSelection(): void {
        if (!this.selection) {
            return
        }
        // remove all selected projects
        this.projectsService.deleteAll(this.selection)

        // reset the selection
        this.selection = []
    }

    downloadProjects(): void {
        // check if projects selected
        if (!this.selection) {
            return
        }
        // download the selection
        Downloader.downloadPorjects(this.selection)

        // reset the selection
        this.selection = []
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe()
        })

        if (this.touchHoldEventHandler) {
            this.touchHoldEventHandler.unregister()
        }
    }

}