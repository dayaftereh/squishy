import { SquishyNodeData } from '../squishy-node.data';
import { Encoding } from 'src/app/utils/encodings';
import { FileInputMode } from './file-input.mode';

export interface FileInputData extends SquishyNodeData {
    encoding: Encoding;
    mode: FileInputMode;
    accept: string;
    extendedOutput: boolean
}