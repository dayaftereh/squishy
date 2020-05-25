import { Injectable } from '@angular/core';
import { SquishyProject } from '../projects-service/squishy-project';
import { Utils } from '../utils/utils';
import { SquishyProjects } from '../projects-service/squishy-projects';


@Injectable()
export class LocalStorageService {

    private storage: Storage | undefined

    private static PROJECTS_KEY = `squishy.projects`

    constructor() {
        // find the local storage
        this.storage = this.getLocalStorage()
    }

    getProjects(): SquishyProjects {
        // get the projects from local storage
        const projectsJson: string | null = this.storage.getItem(LocalStorageService.PROJECTS_KEY)
        // check if projects in local storage
        if (Utils.isNullOrUndefined(projectsJson) || !projectsJson) {
            return {}
        }

        // parese the projects from local storage
        const projects: SquishyProjects = JSON.parse(projectsJson)

        return projects
    }

    setProjects(projects: SquishyProjects): void {
        // make the projects to json string
        const jsonString: string = JSON.stringify(projects)
        // set the projects to local storage
        this.storage.setItem(LocalStorageService.PROJECTS_KEY, jsonString)
    }

    private getLocalStorage(): Storage {
        if (!Utils.isNullOrUndefined(localStorage)) {
            return localStorage
        }
        if (!Utils.isNullOrUndefined(window.localStorage)) {
            return window.localStorage
        }
        return new Storage()

    }

}