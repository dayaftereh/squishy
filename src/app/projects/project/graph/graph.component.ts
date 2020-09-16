import { AfterViewInit, Component as NGComponent, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Component, Engine, NodeEditor } from 'rete';
import { AngularRenderPlugin } from 'rete-angular-render-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import { Data } from 'rete/types/core/data';
import { Subscription } from 'rxjs';
import { PackageJSON } from 'src/app/package-json';
import { Utils } from 'src/app/utils/utils';
import { ProjectsService } from '../../../projects-service/projects.service';
import { SquishyProject } from '../../../projects-service/squishy-project';
import { FileInputComponent } from './components/file-input/file-input.component';
import { FileOutputComponent } from './components/file-output/file-output.component';
import { ScriptComponent } from './components/script/script.component';
import { GraphNodesManager } from './graph-nodes.manager';
import { ProjectGraphService } from './service/project-graph.service';
import { TextInputComponent } from './components/text-input/text-input.component';

@NGComponent({
    selector: 'app-project-graph',
    templateUrl: './graph.component.html',
    styleUrls: [
        './graph.component.scss'
    ]
})
export class GraphComponent implements OnInit, AfterViewInit, OnDestroy {

    project: SquishyProject | undefined

    nodeEditorEvent: EventEmitter<NodeEditor>

    @ViewChild('nodeEditor')
    nodeEditorElement: ElementRef | undefined

    private engine: Engine | undefined
    private editor: NodeEditor | undefined

    private subscriptions: Subscription[]

    private graphNodesManager: GraphNodesManager

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly projectsService: ProjectsService,
        private readonly projectGraphService: ProjectGraphService) {
        this.subscriptions = []
        this.graphNodesManager = new GraphNodesManager()
        this.nodeEditorEvent = new EventEmitter<NodeEditor>(true)
    }

    ngOnInit(): void {
        // register on project
        const projectSubscription: Subscription = this.projectsService.getProjectFromRoute(this.activatedRoute).subscribe((project: SquishyProject | undefined) => {
            const needUpdate: boolean = Utils.isNullOrUndefined(this.project)
            this.project = project
            this.project.data.id = this.id()
            // check if project
            if (needUpdate) {
                this.onDataChanged()
            }
        })

        const dataChangedSubscription: Subscription = this.projectGraphService.onDataChanged(() => {
            this.updateData()
        })

        this.subscriptions.push(projectSubscription, dataChangedSubscription)
    }

    private onDataChanged(): void {
        if (Utils.isNullOrUndefined(this.project) || Utils.isNullOrUndefined(this.project.data)) {
            return
        }

        // set the project data to the graph nodes manager
        this.graphNodesManager.setData(this.project.data)

        if (!Utils.isNullOrUndefined(this.editor)) {            
            this.editor.fromJSON(this.project.data)
            this.editor.trigger('process')
        }
    }

    private id(): string {
        const packageJson: PackageJSON = new PackageJSON()
        return `${packageJson.name}@0.1.0`
    }

    ngAfterViewInit(): void {
        // get the node editor element
        const container: HTMLElement | undefined = this.nodeEditorElement.nativeElement
        if (!container) {
            return
        }
        // get the id for the node editor
        const id: string = this.id()
        // create the node editor
        this.editor = new NodeEditor(id, container)

        // register the plugins
        this.editor.use(ConnectionPlugin);
        this.editor.use(AngularRenderPlugin)
        //this.editor.use(ContextMenuPlugin)

        // create the rete engine
        this.engine = new Engine(id);

        // register the node editor components
        const components: Component[] = this.getComponents()
        components.forEach((component: Component) => {
            this.editor.register(component)
            this.engine.register(component)
        })

        // handle changes on editor
        this.editor.on(['process', 'nodecreated', 'noderemoved', 'connectioncreated', 'connectionremoved'], (async () => {
            await this.updateData()
        }) as any);

        // handle error on engine
        this.engine.on('error', (e) => {
            console.error(e)
        });

        // check if project exists
        if (this.project && this.project.data) {           
            // load project data
            this.editor.fromJSON(this.project.data)
        }

        this.editor.view.resize()
        this.editor.trigger('process')

        this.nodeEditorEvent.emit(this.editor)
    }

    private async updateData(): Promise<void> {
        await this.engine.abort();

        // update editor
        const data: Data = this.editor.toJSON()
        await this.engine.process(data);

        // update the project data
        if (this.project) {
            this.project.data = data
            this.projectsService.update(this.project)
        }

        // update the data in the graph nodes manager
        this.graphNodesManager.setData(data)
    }

    private getComponents(): Component[] {
        return [
            new ScriptComponent(this.graphNodesManager),
            new TextInputComponent(this.graphNodesManager),
            new FileInputComponent(this.graphNodesManager),
            new FileOutputComponent(this.graphNodesManager),
        ]
    }

    ngOnDestroy(): void {
        if (this.subscriptions) {
            this.subscriptions.forEach((subscription: Subscription) => {
                subscription.unsubscribe()
            });
        }
    }

}