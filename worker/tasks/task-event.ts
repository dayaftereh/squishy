export interface TaskEvent {
    progress: number
    running: boolean
    error: Error
}