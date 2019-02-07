import { AppWorker } from './app-worker';

const worker: Worker = self as any;
const appWorker: AppWorker = new AppWorker(worker);
appWorker.start();

