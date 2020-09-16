import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { EditorComponent } from 'src/app/editor/editor.component';
import { ExecutorService } from 'src/app/executor-service/executor.service';
import { TextInputData } from 'src/app/projects/project/graph/components/text-input/text-input.data';
import { TextInputType } from 'src/app/projects/project/graph/components/text-input/text-input.type';
import { Utils } from 'src/app/utils/utils';
import { Subscription } from 'rxjs';
import { IfStmt } from '@angular/compiler';

@Component({
    selector: 'app-text-input-executor',
    templateUrl: './text-input-executor.component.html',
    styleUrls: [
        './text-input-executor.component.scss'
    ]
})
export class TextInputExecutorComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('editor')
    editor: EditorComponent | undefined

    @Input()
    textInputData: TextInputData | undefined

    subscription: Subscription | undefined

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private readonly executorService: ExecutorService
    ) {

    }

    private getTextInputId(): string | undefined {
        if (!this.textInputData) {
            return undefined
        }

        return this.textInputData.id
    }

    ngOnInit(): void {
        const content: string | undefined = this.textInputData.content
        this.onContentChanged(content)
    }

    private onContentChanged(content: string | undefined): void {
        const id: string | undefined = this.getTextInputId()
        if (!Utils.isNullOrUndefined(id)) {
            this.executorService.setData(id, content)
        }
    }

    ngAfterViewInit(): void {
        if (!this.editor) {
            return
        }

        // set the script to the editor
        if (this.textInputData) {
            const type: TextInputType = this.textInputData.inputType
            this.editor.setLanguage(`${type}`)

            const content: string = this.textInputData.content || ''
            this.editor.setCode(content)
            this.changeDetectorRef.detectChanges()
        }

        this.subscription = this.editor.onContentChanged((content: string) => {
            this.onContentChanged(content)
        })
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }

}