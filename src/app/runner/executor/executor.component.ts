import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorManagerService } from 'src/app/error-manager/service/error-manager.service';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { FileInputData } from 'src/app/projects/project/graph/components/file-input/file-input.data';
import { NodeComponentsType } from 'src/app/projects/project/graph/components/node-components.type';
import { SquishyNodeData } from 'src/app/projects/project/graph/components/squishy-node.data';
import { Utils } from 'src/app/utils/utils';
import { ExecutionResult } from 'src/worker/execution/execution-result';
import { ExecutorService } from '../../executor-service/executor.service';

@Component({
    templateUrl: './executor.component.html',
    styleUrls: [
        './executor.component.scss'
    ]
})
export class ExecutorComponent implements OnInit, OnDestroy {

    project: SquishyProject | undefined

    private subscription: Subscription | undefined

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly executorService: ExecutorService,
        private readonly projectsService: ProjectsService,
        private readonly errorManagerService: ErrorManagerService) {
    }

    ngOnInit(): void {
        // reset the project
        this.executorService.setProject(undefined)
        // get the current actibe project
        this.subscription = this.projectsService.getProjectFromRoute(this.activatedRoute).subscribe((project: SquishyProject | undefined) => {
            if (project) {
                this.project = project
                this.executorService.setProject(project)
            } else {
                this.router.navigate(['/runner'])
            }
        })

    }

    fileInputs(): FileInputData[] {
        // get all file inputs
        return Utils.getSquishyNodesData(this.project).filter((nodeData: SquishyNodeData) => {
            return nodeData.type === NodeComponentsType.FileInput
        }).map((nodeData: SquishyNodeData) => {
            return nodeData as FileInputData
        })
    }

    async execute(): Promise<void> {
        this.errorManagerService.clear()

        try {
            const result: ExecutionResult = await this.executorService.execute()
            console.log(result)
        } catch (e) {
            this.errorManagerService.error(e)
            // print the error to console
            console.error(e)
        }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }
}