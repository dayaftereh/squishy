import { saveAs } from 'file-saver';
import * as sanitize from 'sanitize-filename'
import { SquishyProject } from '../projects-service/squishy-project';

export class Downloader {

    static download(blob: Blob, filename: string): void {
        const sanitizeFilename: string = Downloader.escapeFilename(filename)
        saveAs(blob, sanitizeFilename)
    }

    static escapeFilename(filename: string): string {
        const whitoutWhitespace: string = filename.replace(/\s+/g, '_')
        return sanitize(whitoutWhitespace, { replacement: '-' })
    }

    static downloadPorjects(projects: SquishyProject[]): void {
        // check fi projects given
        if (!projects) {
            return
        }

        // make the projects to json
        const content: string = JSON.stringify(projects, undefined, 2)

        // get the file name for the projects
        let filename: string = projects.map((project: SquishyProject) => {
            return project.name
        }).reduce((first: string, next: string) => {
            return `${first}-${next}`
        })

        // check if the file name is not empty
        if (!filename || filename.length < 1) {
            filename = 'squishy_project'
        }

        // append the json
        filename = `${filename}.json`

        // create the blob with the projects
        const blob: Blob = new Blob([content], {
            type: "application/json;charset=utf-8"
        })

        // download the projects
        Downloader.download(blob, filename)
    }

}