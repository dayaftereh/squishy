import { NgModule } from '@angular/core';
import { Component } from 'rete';
import { NodeService } from 'rete-angular-render-plugin';
import { FileInputNodeModule } from '../components/file-input/file-input-node.module';
import { FileOutputNodeModule } from '../components/file-output/file-output-node.module';
import { ScriptNodeModule } from '../components/script/script-node.module';
import { ScriptComponent } from './script/script.component';
import { FileInputComponent } from './file-input/file-input.component';
import { FileOutputComponent } from './file-output/file-output.component';

export const NodeComponents: Component[] = [
    new ScriptComponent(),
    new FileInputComponent(),
    new FileOutputComponent()
]

@NgModule({
    imports: [
        // Custom
        FileInputNodeModule,
        FileOutputNodeModule,
        ScriptNodeModule
    ],
    providers: [
        NodeService
    ]
})
export class NodeComponentsModule {

}
