import { NgModule } from '@angular/core';
import { FileInputNodeModule } from '../components/file-input/file-input-node.module';
import { FileOutputNodeModule } from '../components/file-output/file-output-node.module';
import { ScriptNodeModule } from '../components/script/script-node.module';

@NgModule({
    imports: [
        // Custom
        FileInputNodeModule,
        FileOutputNodeModule,
        ScriptNodeModule
    ]
})
export class NodeComponentsModule {

}
