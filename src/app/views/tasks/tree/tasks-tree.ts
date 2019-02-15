import { TreeNode } from 'primeng/api';
import { combineLatest, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Task } from 'src/core/exectuion/task/task';
import { ExecutionPlan } from '../../../../core/exectuion/plan/execution-plan';
import { ExecutionPlanEntry } from '../../../../core/exectuion/plan/execution-plan-entry';
import { ExecutionPlanUtils } from '../../../../core/exectuion/plan/execution-plan.utils';
import { OutputTask } from '../../../../core/exectuion/task/output/output-task';
import { TaskId } from '../../../../core/exectuion/task/task-id';
import { Tasks } from '../../../../core/exectuion/task/tasks';

export class TasksTree {

    private nodes: Map<string, TreeNode>;

    private tasks: Observable<Tasks | undefined>;
    private output: Observable<OutputTask | undefined>;

    constructor(output: Observable<OutputTask | undefined>, tasks: Observable<Tasks | undefined>) {
        this.tasks = tasks;
        this.output = output;
        this.nodes = new Map<string, TreeNode>();
    }

    tree(): Observable<TreeNode[]> {
        const tree: Observable<TreeNode[]> = combineLatest(this.output, this.tasks).pipe(
            filter(([output, tasks]) => {
                return !(!output || !tasks);
            }),
            map(([output, tasks]) => {
                const executionPlan: ExecutionPlan = ExecutionPlanUtils.executionPlan(output!, tasks!);
                return {
                    tasks,
                    executionPlan
                };
            }),
            map((values) => {
                return this.toTreeNodes(values.tasks!, values.executionPlan!);
            })
        );

        return tree;
    }

    private toTreeNodes(tasks: Tasks, executionPlan: ExecutionPlan): TreeNode[] {
        const visited: Set<TaskId> = new Set<TaskId>();
        const root: TreeNode = this.deep(executionPlan, visited);
        const unvisited: TreeNode [] = this.unvisited(tasks, visited);

        this.dropUnvisitedTreeNodes(visited);

        return [
            root,
            ...unvisited
        ];
    }

    private unvisited(tasks: Tasks, visited: Set<TaskId>): TreeNode [] {
        const keys: string[] = Object.keys(tasks);
        const unvisited: TaskId[] = keys.filter((key: string) => {
            return !visited.has(key);
        });

        return unvisited.map((taskId: TaskId) => {
            const task: Task | undefined = tasks[taskId];
            return task;
        }).filter((task: Task | undefined) => {
            return !!(task);
        }).map((task: Task) => {
            visited.add(task.id);
            const treeNode: TreeNode = this.getOrCreateTreeNode(task);
            this.updateLeaf(treeNode, task);
            return treeNode;
        });
    }

    private deep(root: ExecutionPlanEntry, visited: Set<TaskId>): TreeNode {
        visited.add(root.task.id);

        const node: TreeNode = this.getOrCreateTreeNode(root.task);

        if (!root.children || root.children.length < 1) {
            this.updateLeaf(node, root.task);
            return node;
        }

        const children: TreeNode[] = root.children.map((entry: ExecutionPlanEntry) => {
            return this.deep(entry, visited);
        });

        this.updateChildren(node, root.task, children);
        return node;
    }

    private updateLeaf(node: TreeNode, task: Task): void {
        node.type = 'leaf';
        node.leaf = true;
        node.label = task.name;
    }

    private updateChildren(node: TreeNode, task: Task, children: TreeNode[]): void {
        node.leaf = false;
        node.type = undefined;
        node.expanded = true;
        node.label = task.name;
        node.children = children;
    }

    private getOrCreateTreeNode(task: Task): TreeNode {
        const id: TaskId = task.id;

        let treeNode: TreeNode | undefined = this.nodes.get(id);
        if (!treeNode) {
            treeNode = {
                data: task
            };
            this.nodes.set(id, treeNode);
        }

        return treeNode;
    };

    private dropUnvisitedTreeNodes(visited: Set<TaskId>): void {
        this.nodes.forEach((_, key: string) => {
            if (visited.has(key)) {
                return;
            }
            this.nodes.delete(key);
        });
    }

}