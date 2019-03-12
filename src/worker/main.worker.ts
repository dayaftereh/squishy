import { CoreWorker } from './core/core.worker';

const worker: Worker = self as any;
const coreWorker: CoreWorker = new CoreWorker(worker);
coreWorker.start();