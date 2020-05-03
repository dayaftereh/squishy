import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { SelectItem } from 'primeng/api/selectitem';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { PropertiesDialogService } from 'src/app/properties-dialog/service/properties-dialog.service';
import { Utils } from 'src/app/utils/utils';
import { NewProjectComponent } from '../new-project/new-project.component';
import { Downloader } from 'src/app/utils/downloader';

@Component({
    templateUrl: './projects-manager-list.component.html',
    selector: 'app-projects-manager-list',
    styleUrls: [
        './projects-manager-list.component.scss'
    ]
})
export class ProjectsManagerListComponent implements OnInit, OnDestroy {

    @Output()
    onProject: EventEmitter<SquishyProject>

    projects: SelectItem[] | undefined

    selection: SquishyProject[] | undefined

    private subscription: Subscription | undefined

    constructor(
        private readonly projectsService: ProjectsService,
        private readonly confirmationService: ConfirmationService,
        private readonly propertiesDialogService: PropertiesDialogService,
    ) {
        this.onProject = new EventEmitter<SquishyProject>(true);
    }

    ngOnInit(): void {
        this.subscription = this.projectsService.projects()
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

    createProject(): void {
        // open the properties dialog with the new project component
        this.propertiesDialogService.open({
            component: NewProjectComponent,
            title: 'New Project',
            onInit: (component: NewProjectComponent) => {

            }
        })
    }

    deleteProjects(): void {
        // check if a project is selected
        if (!this.selection) {
            return
        }

        // open confirm dialog
        this.confirmationService.confirm({
            header: 'Delete',
            message: 'Are you sure that you want to delete all selected projects ?',
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
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}