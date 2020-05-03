import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { Utils } from 'src/app/utils/utils';

@Component({
    templateUrl: './projects-manager-upload.component.html',
    selector: 'app-projects-manager-upload',
    styleUrls: [
        './projects-manager-upload.component.scss'
    ]
})
export class ProjectsManagerUploadComponent {

    constructor(private readonly projectsService: ProjectsService) {

    }

    async onUpload(event: any): Promise<void> {
        // check if event given
        if (Utils.isNullOrUndefined(event) || Utils.isNullOrUndefined(event.files)) {
            return
        }

        const files: File[] = event.files
        // check if files selcted
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

    private async readProjects(file: File): Promise<SquishyProject[]> {
        const content: string = await Utils.readFileAsText(file)
        const projects: SquishyProject[] = JSON.parse(content)
        return projects
    }


}