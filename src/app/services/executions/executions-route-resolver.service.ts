import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Execution } from '../../../core/exectuion/execution';
import { ExecutionsService } from './executions.service';

@Injectable()
export class ExecutionsRouteResolverService {

    private subject: BehaviorSubject<string | undefined>;

    constructor(private readonly executionsService: ExecutionsService) {
        this.subject = new BehaviorSubject<string | undefined>(undefined);
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

    update(execution: Execution, emitEvent?: boolean): void {

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
