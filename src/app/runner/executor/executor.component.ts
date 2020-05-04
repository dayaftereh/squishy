import { Component, OnInit, OnDestroy } from '@angular/core';
import { SquishyProject } from 'src/app/projects-service/squishy-project';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectsService } from 'src/app/projects-service/projects.service';
import { FileInputData } from 'src/app/projects/project/graph/components/file-input/file-input.data';
import { Utils } from 'src/app/utils/utils';
import { Node } from 'rete';
import { NodeData } from 'rete/types/core/data';
import { SquishyNodeData } from 'src/app/projects/project/graph/components/squishy-node.data';
import { NodeComponentsType } from 'src/app/projects/project/graph/components/node-components.type';
import { ExecutorService } from './executor-service/executor.service';

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
        await this.executorService.execute()
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }
}