import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './task-list.component.html'
})
export class TaskListComponent {


    constructor(private readonly activatedRoute: ActivatedRoute) {
    }

}