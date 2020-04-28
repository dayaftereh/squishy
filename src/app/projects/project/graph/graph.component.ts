import { AfterViewInit, Component as NGComponent, ElementRef, ViewChild, ChangeDetectorRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Component, Engine, NodeEditor } from 'rete';
import { AngularRenderPlugin } from 'rete-angular-render-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import { Data } from 'rete/types/core/data';
import { PackageJSON } from 'src/app/package-json';
import { FileInputComponent } from './components/file-input/file-input.component';
import { FileOutputComponent } from './components/file-output/file-output.component';
import { ScriptComponent } from './components/script/script.component';
import { ProjectsService } from '../../service/projects.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SquishyProject } from '../../service/squishy-project';
import { Utils } from 'src/app/utils/utils';

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

    private subscription: Subscription | undefined

    constructor(private readonly activatedRoute: ActivatedRoute,
        private readonly projectsService: ProjectsService) {
        this.nodeEditorEvent = new EventEmitter<NodeEditor>(true)
    }

    ngOnInit(): void {
        // register on project
        this.subscription = this.projectsService.getProjectFromRoute(this.activatedRoute).subscribe((project: SquishyProject | undefined) => {
            // check if project
            if (project) {
                this.onProject(project)
            }
        })
    }

    private onProject(project: SquishyProject): void {
        // update editor if already exists
        if (Utils.isNullOrUndefined(this.project) && !Utils.isNullOrUndefined(project.data)) {
            if (!Utils.isNullOrUndefined(this.editor)) {
                this.editor.fromJSON(project.data)
                this.editor.trigger('process')
            }
        }
        this.project = project

    }

    private id(): string {
        const packageJson: PackageJSON = new PackageJSON()
        return `${packageJson.name}@${packageJson.version}`
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
    }

    private getComponents(): Component[] {
        return [
            new FileInputComponent(),
            new FileOutputComponent(),
            new ScriptComponent()
        ]
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}