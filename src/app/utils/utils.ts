import { NodeData, NodesData } from 'rete/types/core/data';
import * as uuid from 'uuid';
import { SquishyProject } from '../projects-service/squishy-project';
import { SquishyNodeData } from '../projects/project/graph/components/squishy-node.data';

export class Utils {

    private constructor() {

    }

    static uuid(): string {
        return uuid.v4()
    }

    static isNullOrUndefined<T>(x: T): boolean {
        return x === null || x === undefined;
    }

    static isEmpty<T>(array: T[] | undefined): boolean {
        if (Utils.isNullOrUndefined(array)) {
            return true
        }
        return !array || array.length < 1
    }

    static forEachProperty<T>(o: T, fn: (value: unknown, key: string) => void): void {
        const keys: string[] = Object.keys(o)
        keys.forEach((key: string) => {
            const value: unknown = o[key]
            fn(value, key)
        })
    }

    static mapProperties<T, R>(o: T, fn: (value: unknown, key: string) => R): R[] {
        const keys: string[] = Object.keys(o)
        return keys.map((key: string) => {
            const value: unknown = o[key]
            return fn(value, key)
        })
    }

    static async readFileAsText(file: File, encoding?: string): Promise<string> {
        var completed: boolean = false
        const fileReader: FileReader = new FileReader()
        return new Promise((resolve, reject) => {
            // if reader fails
            fileReader.onerror = (e) => {
                if (!completed) {
                    reject(e)
                }
                completed = true
            }

            // callback for done
            const done = () => {
                if (!completed) {
                    const content: string = fileReader.result as string
                    resolve(content)
                }
                completed = true
            }

            fileReader.onload = done
            fileReader.onloadend = done

            // read the file as text
            fileReader.readAsText(file, encoding)
        })
    }

    static getNodesData(project: SquishyProject | undefined): NodeData[] {
        // check if project, data and nodes exists
        if (Utils.isNullOrUndefined(project) || Utils.isNullOrUndefined(project.data) || Utils.isNullOrUndefined(project.data.nodes)) {
            return []
        }
        // get the nodes from the project
        const nodes: NodesData = project.data.nodes

        // get all nodes
        return Utils.mapProperties(nodes, (nodeData: NodeData) => {
            return nodeData
        })
    }

    static getSquishyNodesData(project: SquishyProject | undefined): SquishyNodeData[] {
        return Utils.getNodesData(project).map((nodeData: NodeData) => {
            if (Utils.isNullOrUndefined(nodeData) || Utils.isNullOrUndefined(nodeData.data)) {
                return undefined
            }
            return nodeData.data as any as SquishyNodeData
        }).filter((data: SquishyNodeData | undefined) => {
            return !Utils.isNullOrUndefined(data)
        })
    }

    static headOfSet<T>(set: Set<T>): T | undefined {
        const values: T[] = Array.from(set.values())
        if (!values) {
            return undefined
        }
        return values[0]
    }

}