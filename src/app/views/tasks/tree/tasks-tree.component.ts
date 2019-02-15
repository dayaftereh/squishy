import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Task } from 'src/core/exectuion/task/task';
import { Execution } from '../../../../core/exectuion/execution';
import { OutputTask } from '../../../../core/exectuion/task/output/output-task';
import { Tasks } from '../../../../core/exectuion/task/tasks';
import { TasksService } from '../service/tasks.service';
import { TasksTree } from './tasks-tree';

@Component({
    selector: 'app-tasks-tree',
    templateUrl: './tasks-tree.component.html'
})
export class TasksTreeComponent implements OnInit {

    selection: any;

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
        this.nodes = this.tasksTree.tree().pipe(
            tap((no) => console.log('tree changed', no))
        );
    }

    onSelect(event: any): void {
        if (!event || !event.node) {
            return;
        }
        const node: TreeNode = event.node as TreeNode;
        if (!node.data) {
            return;
        }
        this.tasksService.select(node.data as Task);
    }

    onUnselect(): void {
        this.tasksService.unselect();
    }

}
