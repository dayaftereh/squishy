import { NgModule } from '@angular/core';
import { ExportFileServiceModule } from '../export/export-file-service.module';
import { ExecutionsExportService } from './executions-export.service';
import { ExecutionsImportService } from './executions-import.service';
import { ExecutionsRouteResolver } from './executions-route-resolver';
import { ExecutionsRouteResolverService } from './executions-route-resolver.service';
import { ExecutionsService } from './executions.service';

@NgModule({
    imports: [
        ExportFileServiceModule
    ],
    providers: [
        ExecutionsService,
        ExecutionsRouteResolver,
        ExecutionsImportService,
        ExecutionsExportService,
        ExecutionsRouteResolverService
    ],
    exports: [
        ExportFileServiceModule
    ]
})
export class ExecutionsServiceModule {

}