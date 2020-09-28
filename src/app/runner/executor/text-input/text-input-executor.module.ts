import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ExecutorServiceModule } from 'src/app/executor-service/executor-service.module';
import { TextInputExecutorComponent } from './text-input-executor.component';
import { EditorModule } from 'src/app/editor/editor.module';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        // ngx-translate,
        TranslateModule,
        // PrimeNG
        CardModule,
        // Custom
        EditorModule,
        ExecutorServiceModule
    ],
    declarations: [
        TextInputExecutorComponent
    ],
    exports: [
        TextInputExecutorComponent
    ]
})
export class TextInputExecutorModule {

}