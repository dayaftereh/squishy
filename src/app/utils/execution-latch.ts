export class ExecutionLatch<T> {

    private completed: boolean

    private promise: Promise<T>

    private _resolve: (value?: T) => void | undefined
    private _reject: (error: Error) => void | undefined

    constructor() {
        this.completed = false
        this.promise = new Promise((resolve, reject) => {
            this._reject = reject
            this._resolve = resolve
        })
    }

    async await(): Promise<T> {
        if (!this.promise) {
            throw new Error('promise not created')
        }
        const result: T = await this.promise
        return result
    }

    resolve(value?: T): void {
        if (this.completed) {
            return
        }

        this.completed = true

        if (this._resolve) {
            this._resolve(value)
        }
    }

    reject(error: Error): void {
        if (this.completed) {
            return
        }

        this.completed = true

        if (this._reject) {
            this._reject(error)
        }
    }
}