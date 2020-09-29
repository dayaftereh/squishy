import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorManagerService } from './service/error-manager.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private readonly errorManagerService: ErrorManagerService) {

    }

    handleError(error: Error): void {       
        this.errorManagerService.error(error)
        throw error
    }

}