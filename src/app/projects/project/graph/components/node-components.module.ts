import { NgModule } from '@angular/core';
import { FileInputNodeModule } from '../components/file-input/file-input-node.module';
import { FileOutputNodeModule } from '../components/file-output/file-output-node.module';
import { ScriptNodeModule } from '../components/script/script-node.module';
import { ChartNodeModule } from './chart/chart-node.module';
import { TextInputNodeModule } from './text-input/text-input-node.module';

@NgModule({
    imports: [
        // Custom     
        ChartNodeModule,
        ScriptNodeModule,
        TextInputNodeModule,
        FileInputNodeModule,
        FileOutputNodeModule,
    ]
})
export class NodeComponentsModule {

}
