import { Component } from '@angular/core';
import { Utils } from 'src/app/utils/utils';
import { SquishyProject } from '../service/squishy-project';

@Component({
    templateUrl: './projects-upload.component.html',
    selector: 'app-projects-upload'
})
export class ProjectsUploadComponent {

    constructor() {

    }

    async  onUpload(event: any): Promise<void> {
        if (Utils.isNullOrUndefined(event) || Utils.isNullOrUndefined(event.files)) {
            return
        }
        const files: File[] = event.files

        const projects: SquishyProject[] = Promise.all()


        console.log(files)
    }

    private async readProjects(file: File): Promise<SquishyProject[]> {
        const content: string = await Utils.readFileAsText(file)
        const projects: SquishyProject[] = JSON.parse(content)
        return projects
    }


}