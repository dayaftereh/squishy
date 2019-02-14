import { AppCoreWorker } from './core/app-core.worker';

const worker: Worker = self as any;
const coreWorker: AppCoreWorker = new AppCoreWorker(worker);
coreWorker.start();