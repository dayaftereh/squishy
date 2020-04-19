import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class ScriptEditorService {

    private _open: EventEmitter<string>
    private _submit: EventEmitter<string>

    constructor() {
        this._open = new EventEmitter<string>(true)
        this._submit = new EventEmitter<string>(true)
    }

    submit(script: string): void {
        this._submit.emit(script)
    }

    open(script: string): void {
        this._open.emit(script)
    }

    onOpen(onOpen: (script: string) => void): Subscription {
        return this._open.subscribe((script:string)=>{
            onOpen(script)
        })
    }

    onSubmit(onSubmit: (script: string) => void): Subscription {
        return this._submit.subscribe(onSubmit)
    }

}