export class Random {

    float(): number {
        return Math.random()
    }

    intN(n: number): number {
        const x: number = this.float() * n
        return Math.round(x)
    }

    choice<T>(array: T[]): T | undefined {
        if (!array) {
            return undefined
        }

        const index: number = this.intN(array.length)
        const value: T = array[index]
        return value
    }

    rndStr(): string {
        const s: string = Math.random().toString(36).substr(2, 5);
        return s
    }

    randomString(n: number): string {
        const buf: string[] = []

        let i: number = n
        while (i > 0) {
            const s: string = this.rndStr()
            i -= s.length
            buf.push(s)
        }

        const str: string = buf.join('')
        const result: string = str.substr(0, n)
        return result
    }


}