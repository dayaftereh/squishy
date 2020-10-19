import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import * as semverCoerce from 'semver/functions/coerce';
import * as semverSatisfies from 'semver/functions/satisfies';
import { ErrorManagerService } from 'src/app/error-manager/service/error-manager.service';
import { PackageJSON } from 'src/app/package-json';
import { ProjectsExamplesService } from 'src/app/projects-service/projects-examples.service';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { GraphComponent } from 'src/app/projects/project/graph/graph.component';
import { Utils } from 'src/app/utils/utils';

@Component({
    templateUrl: './projects-manager-upload.component.html',
    selector: 'app-projects-manager-upload',
    styleUrls: [
        './projects-manager-upload.component.scss'
    ]
})
export class ProjectsManagerUploadComponent {

    constructor(
        private readonly projectsService: ProjectsService,
        private readonly translateService: TranslateService,
        private readonly errorManagerService: ErrorManagerService,
        private readonly confirmationService: ConfirmationService,
        private readonly projectsExamplesService: ProjectsExamplesService) {

    }

    async onUpload(event: any): Promise<void> {
        try {
            await this.internalUpload(event)
        } catch (error) {
            console.error(error)
            this.errorManagerService.error(error)
        }
    }

    async internalUpload(event: any): Promise<void> {
        // check if event given
        if (Utils.isNullOrUndefined(event) || Utils.isNullOrUndefined(event.files)) {
            return
        }

        const files: File[] = event.files
        // check if files selected
        if (Utils.isNullOrUndefined(files) || !files) {
            return
        }

        // load all files
        const projectsInList: SquishyProject[][] = await Promise.all(files.map((file: File) => {
            // read the projects from file
            return this.readProjects(file)
        }))

        // reduce the projects in one list
        const projects: SquishyProject[] = projectsInList.reduce((first: SquishyProject[], next: SquishyProject[]) => {
            return [...first, ...next]
        }, [])

        // load all projects
        this.projectsService.updateAll(projects)
    }

    private graphVersion(): string {
        const packageJson: PackageJSON = new PackageJSON()
        return packageJson.graphVersion
    }

    private projectVersion(project: SquishyProject): string {
        const id: string = project.data.id
        const values: string[] = id.split('@')
        if (!values || values.length < 2) {
            throw new Error(`unable to path project version [ ${id} ]`)
        }

        const version: string = semverCoerce(values[1])
        return version
    }

    private async verifyAndUpdateGraphVersion(project: SquishyProject): Promise<void> {
        const graphVersion: string = this.graphVersion()
        const projectVersion: string = this.projectVersion(project)
        // check if the version is allowed
        const satisfies: boolean = semverSatisfies(projectVersion, graphVersion)

        if (satisfies) {
            // update project to current id
            project.data.id = GraphComponent.id()
            return
        }

        // ask to overwrite the graph id
        const overwrite: boolean = await this.confirmOverwrite(project, projectVersion, graphVersion)
        if (overwrite) {
            // update project to current id
            project.data.id = GraphComponent.id()
            return
        }

        throw new Error(`unable to load project, because version [ ${projectVersion} ${graphVersion} ] not match`)
    }

    private async readProjects(file: File): Promise<SquishyProject[]> {
        const content: string = await Utils.readFileAsText(file)
        const projects: SquishyProject[] = JSON.parse(content)

        await Promise.all(projects.map((project: SquishyProject) => {
            return this.verifyAndUpdateGraphVersion(project)
        }))

        return projects
    }

    async uploadExamples(): Promise<void> {
        try {
            await this.fetchAndInjectExamples()
        } catch (error) {
            console.error(error)
            this.errorManagerService.error(error)
        }
    }

    private async fetchAndInjectExamples(): Promise<void> {
        // fetch the example
        const projects: SquishyProject[] = await this.projectsExamplesService.getExamples()
        // verify the id
        projects.forEach((project: SquishyProject) => {
            this.verifyAndUpdateGraphVersion(project)
        })
        // load all projects
        this.projectsService.updateAll(projects)
    }

    private async confirmOverwrite(project: SquishyProject, projectVersion: string, graphVersion: string): Promise<boolean> {
        // get header and message for confirmation dialog
        const header: string = await this.translateService.get('project-manager.upload.overwrite-dialog.header').toPromise()
        const message: string = await this.translateService.get('project-manager.upload.overwrite-dialog.message', {
            graphVersion,
            projectVersion,
            name: project.name,

        }).toPromise()

        return new Promise((resolve) => {
            // open confirm dialog
            this.confirmationService.confirm({
                header,
                message,
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    resolve(true)
                },
                reject: () => {
                    resolve(false)
                }
            })
        })

    }

}