import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ScriptEditorService } from './service/script-editor.service';
import { Subscription } from 'rxjs';
import { ScriptEditorComponent } from './script-editor.component';

@Component({
    templateUrl: './script-editor-dialog.component.html',
    selector: 'app-script-editor-dialog'
})
export class ScriptEditorDialogComponent implements OnInit, OnDestroy {

    display: boolean

    @ViewChild('scriptEditor')
    scriptEditor: ScriptEditorComponent | undefined

    private subscription: Subscription | undefined

    constructor(private readonly scriptExitorService: ScriptEditorService) {

    }

    ngOnInit(): void {
        this.subscription = this.scriptExitorService.onOpen(() => {
            this.display = true;
        })
    }

    submit(): void {
        this.display = false;
        if (this.scriptEditor) {
            this.scriptEditor.submit()
        }
    }

    cancel(): void {
        this.display = false;
        if (this.scriptEditor) {
            this.scriptEditor.cancel()
        }
    }

    onShow(): void {
        this.scriptEditor.layout()
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }
}