import { AfterViewInit, Component as NGComponent, ElementRef, ViewChild } from '@angular/core';
import { Component, Engine, NodeEditor } from 'rete';
import { AngularRenderPlugin } from 'rete-angular-render-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import { PackageJSON } from 'src/app/package-json';
import { InputGraphComponent } from './components/input-graph.component';
import { OutputGraphComponent } from './components/output-graph.component';
import { ScriptGraphComponent } from './components/script-graph.component';

@NGComponent({
    selector: 'app-project-graph',
    templateUrl: './graph.component.html',
    styleUrls: [
        './graph.component.scss'
    ]
})
export class GraphComponent implements AfterViewInit {

    @ViewChild('nodeEditor')
    nodeEditorElement: ElementRef | undefined

    private engine: Engine | undefined
    private editor: NodeEditor | undefined

    constructor() {

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
        this.editor.use(ContextMenuPlugin)

        // create the rete engine
        this.engine = new Engine(id);

        // register the node editor components
        const components: Component[] = this.getComponents()
        components.forEach((component: Component) => {
            this.editor.register(component)
            this.engine.register(component)
        })

        this.editor.on(['process', 'nodecreated', 'noderemoved', 'connectioncreated', 'connectionremoved'], (async () => {
            console.log("tt")
            await this.engine.abort();
            await this.engine.process(this.editor.toJSON());
        }) as any);

        this.editor.view.resize()
        this.editor.trigger('process')
    }

    private getComponents(): Component[] {
        return [
            new InputGraphComponent(),
            new OutputGraphComponent(),
            new ScriptGraphComponent()
        ]
    }

}