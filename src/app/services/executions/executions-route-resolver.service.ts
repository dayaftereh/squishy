import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';
import { Execution } from '../../../core/exectuion/execution';
import { ExecutionsService } from './executions.service';

@Injectable()
export class ExecutionsRouteResolverService {

    private subject: BehaviorSubject<string | undefined>;

    constructor(private readonly router: Router,
                private readonly executionsService: ExecutionsService) {
        this.subject = new BehaviorSubject<string | undefined>(undefined);
        this.subject.pipe(filter((id: string | undefined) => {
            return !id;
        })).subscribe(() => {
            this.router.navigate(['/']);
        });
    }

    execution(): Observable<Execution | undefined> {
        return this.subject.pipe(
            flatMap((id: string | undefined) => {
                if (!id) {
                    return of(undefined);
                }
                return this.executionsService.execution(id);
            })
        );
    }

    emit(id: string | undefined): void {
        this.subject.next(id);
    }

    update(execution: Execution): void {
        this.executionsService.update();
    }

    remove(): void {
        const id: string | undefined = this.subject.getValue();
        if (id) {
            this.executionsService.deleteExecution(id);
            this.subject.next(undefined);
        }
    }

    export(): void {

    }

}
