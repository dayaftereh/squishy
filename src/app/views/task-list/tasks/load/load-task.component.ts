import { Component, Input } from '@angular/core';
import { LoadTask } from '../../../../services/task/load/load-task';

@Component({
    selector: 'app-load-task',
    templateUrl: './load-task.component.html',
    styleUrls: [
        './load-task.component.scss'
    ]
})
export class LoadTaskComponent {

    files: File[] | undefined;

    @Input()
    task: LoadTask | undefined;

    constructor() {
    }

}