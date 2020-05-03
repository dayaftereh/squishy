import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SquishyProject } from './squishy-project';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Utils } from 'src/app/utils/utils';

type Projects = { [key: string]: SquishyProject }

@Injectable()
export class ProjectsService {

    private _projects: BehaviorSubject<Projects>

    constructor() {
        this._projects = new BehaviorSubject<Projects>({})
    }

    projects(): Observable<Projects> {
        return this._projects.asObservable()
    }

    update(project: SquishyProject): void {
        const projects: Projects = this._projects.value
        projects[project.id] = project
        this._projects.next(projects)
    }

    updateAll(list: SquishyProject[]): void {
        // get all loaded projects
        const projects: Projects = this._projects.value

        // load the projects into loaded projects
        list.forEach((project: SquishyProject) => {
            projects[project.id] = project
        })

        // notify about projects changed
        this._projects.next(projects)
    }

    get(id: string): Observable<SquishyProject> {
        return this._projects.asObservable().pipe(
            map((projects: Projects) => {
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
        const projects: Projects = this._projects.value

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
        const projects: Projects = this._projects.value

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