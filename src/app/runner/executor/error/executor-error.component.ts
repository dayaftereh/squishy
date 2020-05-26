import { Component } from '@angular/core';
import { Message } from 'primeng/api/message';

@Component({
    templateUrl: './executor-error.component.html',
    selector: 'app-executor-error'
})
export class ExecutorErrorComponent {

    messages: Message[];

    constructor() {
        this.messages = []
    }

    addError(error: Error): void {
        const message: Message = this.errorToMessage(error)
        this.messages.push(message)
    }

    private errorToMessage(error: Error): Message {
        const detail: string[] = []

        // check if stack given
        if (error.stack) {

            const lines: string[] = error.stack.split(/[\n|\r\n]+/g)
            // get the first line of the stacktrace as dt
            if (lines.length > 0) {
                const first: string = lines[0]
                detail.push(`<dt>${first}<dt>`)
            }

            // get the last lines as dd
            const last: string[] = lines.slice(1)
            detail.push(...last.map((line: string) => {
                return `<dd>${line}</dd>`
            }))
        } else {
            // get message alway as dt
            detail.push(`<dt>${error.message}<dt>`)
        }

        // create the message
        return {
            data: error,
            severity: 'error',
            summary: `${error.name}`,
            detail: `<dl>${detail.join('')}<dl>`,
        }
    }

    clear(): void {
        this.messages = []
    }
}