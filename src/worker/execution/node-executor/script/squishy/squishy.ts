import { SquishyIO } from './io/squishy-io';

export interface Squishy {
    context: any
    io: SquishyIO
    progress(value: number): void
}