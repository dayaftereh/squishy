import { Component as NgComponent, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { ContextMenu } from 'primeng/contextmenu/public_api';
import { NodeEditor, Component, Node } from 'rete';
import { Utils } from 'src/app/utils/utils';

@NgComponent({
    templateUrl: './graph-context-menu.component.html',
    selector: 'app-graph-context-menu'
})
export class GraphContextMenuComponent implements OnInit {

    items: MenuItem[]

    @ViewChild('menu')
    menu: ContextMenu | undefined

    @Input()
    nodeEditorEvent: EventEmitter<NodeEditor>

    constructor() {
        this.items = []
    }

    ngOnInit(): void {
        this.nodeEditorEvent.subscribe((nodeEditor: NodeEditor) => {
            this.onEditor(nodeEditor)
        })
    }

    private onEditor(nodeEditor: NodeEditor): void {
        nodeEditor.on(['contextmenu'], (event: unknown) => {
            this.showContextMenu(event)
        })

        nodeEditor.components.forEach((component: Component) => {
            const menuItem: MenuItem = this.createMenuItem(nodeEditor, component)
            this.items.push(menuItem)
        })

    }

    private createMenuItem(nodeEditor: NodeEditor, component: Component): MenuItem {
        return {
            label: component.name,
            command: async (event: any) => {
                const node: Node = await this.createNode(event, component)
                console.log(node);
                nodeEditor.addNode(node)
            }
        }
    }

    private async createNode(event: any, component: Component): Promise<Node> {
        const node: Node = await component.createNode({})

        if (Utils.isNullOrUndefined(event)) {
            return node
        }

        const originalEvent: MouseEvent = event.originalEvent
        if (Utils.isNullOrUndefined(originalEvent)) {
            return node
        }

        node.position[0] = originalEvent.x
        node.position[1] = originalEvent.y

        return node
    }

    private showContextMenu(event: any): void {
        if (Utils.isNullOrUndefined(event)) {
            return
        }
        const mouseEvent: MouseEvent = event.e
        if (Utils.isNullOrUndefined(mouseEvent)) {
            return
        }

        if (this.menu) {
            this.menu.show(mouseEvent)
        }
    }


}