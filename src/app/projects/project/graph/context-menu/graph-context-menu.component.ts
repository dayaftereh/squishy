import { Component as NgComponent, EventEmitter, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api/menuitem';
import { ContextMenu } from 'primeng/contextmenu/public_api';
import { Node, NodeEditor } from 'rete';
import { Component } from 'rete/types/engine';
import { Subscription } from 'rxjs';
import { Utils } from 'src/app/utils/utils';

@NgComponent({
    templateUrl: './graph-context-menu.component.html',
    selector: 'app-graph-context-menu'
})
export class GraphContextMenuComponent implements OnInit, OnDestroy {

    items: MenuItem[]

    @ViewChild('menu')
    menu: ContextMenu | undefined

    @Input()
    nodeEditorEvent: EventEmitter<NodeEditor>

    private mouseLocation: { x: number, y: number }

    private editor: NodeEditor | undefined

    private mainItems: MenuItem[];

    private subscriptions: Subscription[]

    constructor(private readonly translateService: TranslateService) {
        this.items = []
        this.mainItems = []
        this.subscriptions = []
        this.mouseLocation = { x: 0.0, y: 0.0 }
    }

    ngOnInit(): void {
        const nodeEditorSubscription: Subscription = this.nodeEditorEvent.subscribe((nodeEditor: NodeEditor) => {
            this.onEditor(nodeEditor)
        })

        this.subscriptions.push(nodeEditorSubscription)
    }

    private onEditor(nodeEditor: NodeEditor): void {
        this.editor = nodeEditor

        nodeEditor.on(['contextmenu'], async (event: unknown) => {
            await this.showContextMenu(event)
        })

        nodeEditor.on('mousemove', (event: any) => {
            this.mouseLocation.x = event.x
            this.mouseLocation.y = event.y
        })

        const components: Component[] = Array.from(nodeEditor.components.values())
        Promise.all(
            components.sort((a: Component, b: Component) => {
                return a.name.localeCompare(b.name)
            }).map(async (component: Component) => {
                const menuItem: MenuItem = await this.createMenuItem(nodeEditor, component)
                this.mainItems.push(menuItem)
            })
        )

    }

    private async createMenuItem(nodeEditor: NodeEditor, component: Component): Promise<MenuItem> {
        // get the name of the component
        const name: string = component.name
        // make the name to lower cases
        const nameLower: string = name.toLocaleLowerCase()
        // get the context menu label
        const label: string = await this.translateService.get(`projects.project.graph.context-menu.components.${nameLower}`).toPromise()

        return {
            label,
            command: async (event: any) => {
                // create the node and add to the editor
                const node: Node = await this.createNode(event, component)
                nodeEditor.addNode(node)
            }
        }
    }

    private copyDeep<T>(data: T): T {
        return JSON.parse(JSON.stringify(data)) as T
    }

    private async createNode(event: any, component: Component, data?: unknown, meta?: unknown, offset?: number): Promise<Node> {
        if (!Utils.isNullOrUndefined(data)) {
            data = this.copyDeep(data)
        }

        const node: Node = await (component as any).createNode(data)

        if (!Utils.isNullOrUndefined(meta)) {
            node.meta = this.copyDeep(meta) as { [key: string]: unknown }
        }

        if (Utils.isNullOrUndefined(event)) {
            return node
        }

        const originalEvent: MouseEvent = event.originalEvent
        if (Utils.isNullOrUndefined(originalEvent)) {
            return node
        }

        const x: number = this.mouseLocation.x
        const y: number = this.mouseLocation.y

        if (Utils.isNullOrUndefined(offset)) {
            node.position[0] = x
            node.position[1] = y
        } else {
            node.position[0] = x + offset
            node.position[1] = y + offset
        }

        return node
    }

    private async showContextMenu(event: any): Promise<void> {
        if (Utils.isNullOrUndefined(this.editor)) {
            return
        }

        if (Utils.isNullOrUndefined(event)) {
            return
        }
        const mouseEvent: MouseEvent = event.e
        if (Utils.isNullOrUndefined(mouseEvent)) {
            return
        }

        if (Utils.isNullOrUndefined(event.node)) {
            this.items = this.mainItems
        } else {
            const node: Node = event.node
            this.items = await this.createNodeMenuItems(node)
        }

        mouseEvent.stopPropagation()

        if (this.menu) {
            this.menu.show(mouseEvent)
        }
    }

    private async createNodeMenuItems(node: Node): Promise<MenuItem[]> {
        if (Utils.isNullOrUndefined(this.editor)) {
            return []
        }

        const cloneLabel: string = await this.translateService.get('projects.project.graph.context-menu.btn.clone').toPromise()
        const deleteLabel: string = await this.translateService.get('projects.project.graph.context-menu.btn.delete').toPromise()

        const component: Component = this.editor.getComponent(node.name)

        return [
            {
                label: deleteLabel,
                icon: 'pi pi-trash',
                command: () => {
                    this.editor.removeNode(node)
                }
            },
            {
                separator: true
            },
            {
                label: cloneLabel,
                icon: 'pi pi-clone',
                command: async (event: unknown) => {
                    const clone: Node = await this.createNode(event, component, node.data, node.meta)
                    this.editor.addNode(clone)
                }
            }
        ]
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription: Subscription) => {
            subscription.unsubscribe()
        })
    }


}