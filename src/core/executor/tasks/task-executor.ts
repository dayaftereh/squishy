export interface TaskExecutor<T> {
    execute(): T
}