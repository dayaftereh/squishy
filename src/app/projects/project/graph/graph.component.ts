import { AfterViewInit, Component as NGComponent, ElementRef, ViewChild } from '@angular/core';
import { Component, Engine, NodeEditor } from 'rete';
import { AngularRenderPlugin } from 'rete-angular-render-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import { Data } from 'rete/types/core/data';
import { PackageJSON } from 'src/app/package-json';
import { FileInputComponent } from './components/file-input/file-input.component';
import { FileOutputComponent } from './components/file-output/file-output.component';
import { ScriptComponent } from './components/script/script.component';

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
            await this.engine.abort();
            
            const json: Data = this.editor.toJSON()
            await this.engine.process(json);
        }) as any);

        this.engine.on('error', (e) => {
            console.error(e)
        });

        this.editor.view.resize()
        this.editor.trigger('process')
    }

    private getComponents(): Component[] {
        return [
            new FileInputComponent(),
            new FileOutputComponent(),
            new ScriptComponent()
        ]
    }

    data(): void {
        const json: Data = this.editor.toJSON()
        console.log(json)
    }

}