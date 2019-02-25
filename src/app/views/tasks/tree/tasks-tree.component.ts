import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OrganizationChart } from 'primeng/primeng';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Task } from 'src/core/exectuion/task/task';
import { TaskType } from '../../../../core/exectuion/task/task-type';
import { TasksService } from '../service/tasks.service';

@Component({
    selector: 'app-tasks-tree',
    templateUrl: './tasks-tree.component.html'
})
export class TasksTreeComponent implements OnInit, OnDestroy {

    TaskType: any = TaskType;

    selection: TreeNode | undefined;

    @Input()
    root: TreeNode;

    @ViewChild('tree')
    tree: OrganizationChart;

    private subscription: Subscription;

    constructor(private readonly tasksService: TasksService) {

    }

    ngOnInit(): void {
        this.subscription = this.tasksService.selection().pipe(
            filter((task: Task | undefined) => {
                return !!(task);
            })
        ).subscribe((task: Task | undefined) => {
            this.handleSelection(task!);
        });
    }

    private handleSelection(task: Task): void {
        if (!this.selection) {
            return;
        }

        const current: Task = this.selection.data as Task;
        if (current.id === task.id) {
            return;
        }

        this.tree.selection = undefined;
    }

    onSelect(event: any): void {
        if (!event || !event.node) {
            return;
        }
        const node: TreeNode = event.node as TreeNode;
        if (!node.data) {
            return;
        }
        this.selection = node;
        this.tasksService.select(node.data as Task);
    }

    onUnselect(): void {
        this.selection = undefined;
        this.tasksService.unselect();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
