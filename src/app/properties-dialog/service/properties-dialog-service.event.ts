import { Type } from '@angular/core';
import { PropertiesDialogChild } from './properties-dialog-child';

export interface PropertiesDialogServiceEvent {
    title: string
    component: Type<PropertiesDialogChild>
    onInit(component: unknown): void
}