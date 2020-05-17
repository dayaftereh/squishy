import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { FileInputData } from 'src/app/projects/project/graph/components/file-input/file-input.data';
import { NodeComponentsType } from 'src/app/projects/project/graph/components/node-components.type';
import { SquishyNodeData } from 'src/app/projects/project/graph/components/squishy-node.data';
import { Utils } from 'src/app/utils/utils';
import { ExecutorService } from '../../executor-service/executor.service';
import { ExecutionResult } from 'src/worker/execution/execution-result';

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
        private readonly projectsService: ProjectsService) {
    }

    ngOnInit(): void {
        // reset the project
        this.executorService.setProject(undefined)

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
        return Utils.getSquishyNodesData(this.project).filter((nodeData: SquishyNodeData) => {
            return nodeData.type === NodeComponentsType.FileInput
        }).map((nodeData: SquishyNodeData) => {
            return nodeData as FileInputData
        })
    }

    async execute(): Promise<void> {
        const result: ExecutionResult = await this.executorService.execute()
        console.log(result)
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }
}