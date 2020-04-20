import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ReteModule } from 'rete-angular-render-plugin';
import { PropertiesDialogModule } from 'src/app/properties-dialog/properties-dialog.module';
import { ScriptNodeComponent } from './script-node.component';

@NgModule({
    imports: [
        // Angular
        FormsModule,
        BrowserModule,
        // Primeng
        PanelModule,
        ButtonModule,
        InputTextModule,
        // rete
        ReteModule,
        // Custom
        PropertiesDialogModule
    ],
    declarations: [
        ScriptNodeComponent
    ],
    exports: [
        ScriptNodeComponent
    ]
})
export class ScriptNodeModule {

}