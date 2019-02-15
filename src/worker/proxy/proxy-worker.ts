import { LinkClient } from '../link/link-client';

export class ProxyWorker {

    private worker: Worker | undefined;
    private linkClient: LinkClient | undefined;

    constructor() {
    }

    start(): void {
        this.worker = new Worker('../main.worker.ts', { type: 'module' });
        this.linkClient = new LinkClient(this.worker);
        this.linkClient.start();
    }

    async readlines(files: File[], maxLines?: number): Promise<string[][]> {
        if (!this.linkClient) {
            throw new Error(`link client not initialized`);
        }

        const lines: string[][] = await this.linkClient.call('readlines', files, maxLines);
        return lines;
    }

    async execute(taskExecution: any): Promise<Blob> {
        if (!this.linkClient) {
            throw new Error(`link client not initialized`);
        }

        const blob: Blob = await this.linkClient.call('execute', taskExecution);
        return blob;
    }

}
