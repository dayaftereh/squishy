import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Execution } from '../../../../../core/exectuion/execution';
import { ExecutionStatus } from '../../../../../core/exectuion/execution-status';
import { ExecutionPlan } from '../../../../../core/exectuion/plan/execution-plan';
import { ExecutionPlanEntry } from '../../../../../core/exectuion/plan/execution-plan-entry';
import { ExecutionPlanUtils } from '../../../../../core/exectuion/plan/execution-plan.utils';
import { TaskState } from '../../../../../core/exectuion/task/task-state';
import { ExecutionsRouteResolverService } from '../../../../services/executions/executions-route-resolver.service';
import { ExecutorService } from '../../../../services/executor/executor.service';

@Component({
    selector: 'app-execution-status-tree',
    templateUrl: './execution-status-tree.component.html'
})
export class ExecutionStatusTreeComponent implements OnInit {

    nodes: Observable<TreeNode[]>;

    constructor(
        private readonly executorService: ExecutorService,
        private readonly executionsRouteResolverService: ExecutionsRouteResolverService) {
    }

    ngOnInit(): void {
        this.nodes = combineLatest(this.executionsRouteResolverService.execution(), this.executorService.status).pipe(
            map(([execution, status]) => {
                return this.buildTree(execution, status);
            })
        );
    }

    private buildTree(execution: Execution | undefined, status: ExecutionStatus | undefined): TreeNode[] {
        if (!execution) {
            return [];
        }

        if (!status) {
            status = {};
        }

        const executionPlan: ExecutionPlan = ExecutionPlanUtils.executionPlan(execution.output, execution.tasks);
        const root: TreeNode = this.deep(executionPlan, status);
        return [root];
    }

    private deep(root: ExecutionPlanEntry, status: ExecutionStatus): TreeNode {
        const node: TreeNode = {
            label: root.task.name,
            leaf: true,
            children: [],
            expanded: true,
            data: root.task
        };

        if (root.children && root.children.length > 0) {
            node.children = root.children.map((child: ExecutionPlanEntry) => {
                return this.deep(child, status);
            });
            node.leaf = false;
        }

        const state: TaskState | undefined = status[root.task.id];
        if (state) {
            node.type = `${state}`;
        }

        return node;
    }

}
