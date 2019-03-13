import { NgModule } from '@angular/core';
import { ExecutorServiceModule } from '../../../../services/executor/executor-service.module';
import { ExportFileServiceModule } from '../../../../services/export/export-file-service.module';
import { ExecutionRunService } from './execution-run.service';

@NgModule({
    imports: [
        // custom
        ExecutorServiceModule,
        ExportFileServiceModule
    ],
    providers: [
        ExecutionRunService
    ]
})
export class ExecutionRunServiceModule {

}