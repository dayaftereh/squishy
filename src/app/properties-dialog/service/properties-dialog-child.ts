import { PropertiesDialogServiceEvent } from './properties-dialog-service.event';

export interface PropertiesDialogChild {
    submit(): Promise<void>
    cancel(): Promise<void>
    resized(width: number, height: number): void
}