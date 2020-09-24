/**
 * An instance of this class is used to generate pseudorandom numbers with `Math.random`.
 */
export class Random {

    /**
     * Returns a pseudorandom number between 0 and 1.
     */
    float(): number {
        return Math.random()
    }

    /**
     * Returns a pseudorandom number between 0 and and given `n`.
     * @param n the upper bound (exclusive). Must be positive.
     */
    intN(n: number): number {
        const x: number = this.float() * n
        return Math.round(x)
    }

    /**
     * Return a random element from the given array or `undefined` if the array is empty
     * @param array the array to choice a random element from
     */
    choice<T>(array: T[]): T | undefined {
        if (!array) {
            return undefined
        }

        const index: number = this.intN(array.length)
        const value: T = array[index]
        return value
    }

    /**
     * Returns a random string
     */
    rndStr(): string {
        const s: string = Math.random().toString(36).substr(2, 5);
        return s
    }

    /**
     * Returns a random string with the given length
     * @param n the length of random string to create
     */
    randomString(n: number): string {
        if (n < 1) {
            return ''
        }

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