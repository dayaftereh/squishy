import { Injectable } from '@angular/core';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ExecutorService {

    private project: SquishyProject | undefined
    private _executable: BehaviorSubject<void>
    private executorData: { [key: string]: unknown } | undefined

    constructor() {
        this.executorData = {}
        this._executable = new BehaviorSubject<void>(undefined)
    }

    setProject(project: SquishyProject): void {
        // reset the excutor data
        this.executorData = {}
        // update the project
        this.project = project;
    }

    setData(id: string, data: unknown): void {
        if (this.executorData) {
            this.executorData[id] = data
        }
        this._executable.next()
    }

    isExecuteable(): boolean {
        if (!this.project) {
            return false
        }
        if (!this.executorData) {
            return false
        }
    }

    executeable(): Observable<boolean> {
        return this._executable.pipe(
            map(() => {
                return this.isExecuteable()
            })
        )
    }

    async execute(): Promise<void> {
        console.log(this.project, this.executorData)
    }

}