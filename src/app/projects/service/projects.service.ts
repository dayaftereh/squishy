import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SquishyProject } from '../project/project';

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

    get(id: string): Observable<SquishyProject> {
        return this._projects.asObservable().pipe(
            map((projects: Projects) => {
                return projects[id] as SquishyProject
            })
        )
    }
}