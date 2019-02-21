import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Execution } from '../../../../core/exectuion/execution';
import { OutputTask } from '../../../../core/exectuion/task/output/output-task';
import { Tasks } from '../../../../core/exectuion/task/tasks';
import { TasksService } from '../service/tasks.service';
import { TasksTree } from './tasks-tree';

@Component({
    selector: 'app-tasks-trees',
    templateUrl: './tasks-trees.component.html'
})
export class TasksTreesComponent implements OnInit {

    nodes: Observable<TreeNode[]> | undefined;

    private tasksTree: TasksTree | undefined;

    constructor(private readonly tasksService: TasksService) {

    }

    ngOnInit(): void {
        const tasks: Observable<Tasks | undefined> = this.tasksService.execution().pipe(
            map((execution: Execution | undefined) => {
                if (!execution) {
                    return undefined;
                }
                return execution.tasks;
            })
        );

        const output: Observable<OutputTask | undefined> = this.tasksService.execution().pipe(
            map((execution: Execution | undefined) => {
                if (!execution) {
                    return undefined;
                }
                return execution.output;
            })
        );

        this.tasksTree = new TasksTree(output, tasks);
        this.nodes = this.tasksTree.tree();
    }

}