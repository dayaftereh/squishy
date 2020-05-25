import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SquishyProject } from './squishy-project';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Utils } from 'src/app/utils/utils';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { SquishyProjects } from './squishy-projects';

@Injectable()
export class ProjectsService {

    private _projects: BehaviorSubject<SquishyProjects>

    constructor(private readonly localStorageService: LocalStorageService) {
        // get the projects from local storage
        const localStorageProjects: SquishyProjects = this.localStorageService.getProjects()
        // create the projects subject
        this._projects = new BehaviorSubject<SquishyProjects>(localStorageProjects)
        // get always changed projects to local storage
        this.subscribeProjects()
    }

    private subscribeProjects(): void {
        // subscribe to the change of projects
        this._projects.subscribe((projects: SquishyProjects) => {
            // set the current projects to local storage
            this.localStorageService.setProjects(projects)
        })
    }

    projects(): Observable<SquishyProjects> {
        return this._projects.asObservable()
    }

    update(project: SquishyProject): void {
        const projects: SquishyProjects = this._projects.value
        projects[project.id] = project
        this._projects.next(projects)
    }

    updateAll(list: SquishyProject[]): void {
        // get all loaded projects
        const projects: SquishyProjects = this._projects.value

        // load the projects into loaded projects
        list.forEach((project: SquishyProject) => {
            projects[project.id] = project
        })

        // notify about projects changed
        this._projects.next(projects)
    }

    get(id: string): Observable<SquishyProject> {
        return this._projects.asObservable().pipe(
            map((projects: SquishyProjects) => {
                return projects[id] as SquishyProject
            })
        )
    }

    getProjectFromRoute(activatedRoute: ActivatedRoute): Observable<SquishyProject | undefined> {
        return activatedRoute.paramMap.pipe(
            map((paramMap: ParamMap) => {
                return paramMap.get(`id`)
            }),
            switchMap((id: string) => {
                return this.get(id)
            })
        )
    }

    create(name: string): string {
        // generate new project id
        const id: string = Utils.uuid()
        // create the project
        const project: SquishyProject = {
            id,
            name
        } as SquishyProject
        // update the projects
        this.update(project)

        return id
    }

    delete(project: SquishyProject): void {
        // get all loaded projects
        const projects: SquishyProjects = this._projects.value

        // check if the rpoject exists
        if (Utils.isNullOrUndefined(projects[project.id])) {
            return
        }

        // drop the project
        delete projects[project.id]

        // notify about change
        this._projects.next(projects)
    }

    deleteAll(list: SquishyProject[]): void {
        // get all loaded projects
        const projects: SquishyProjects = this._projects.value

        // get only existsing projects
        list.filter((project: SquishyProject) => {
            return !Utils.isNullOrUndefined(projects[project.id])
        }).forEach((project: SquishyProject) => {
            // drop the project
            delete projects[project.id]
        })

        // notify about change
        this._projects.next(projects)
    }


}