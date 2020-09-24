
export class SquishyIO {

    static NEWLINE: string = "\n"
    static DELIMITER: string = ';'

    csvStringify(data: (unknown[][]) | undefined, delimiter?: string, newline?: string): string {
        if (!data) {
            return ''
        }

        if (!delimiter) {
            delimiter = SquishyIO.DELIMITER
        }

        if (!newline) {
            newline = SquishyIO.NEWLINE
        }

        return data.map((line: unknown[]) => {
            return line.map((value: unknown) => {
                return `${value}`
            }).join(delimiter)
        }).join(newline)
    }

    csvParse(content: string | undefined, delimiter?: string): string[][] {
        if (!content) {
            return []
        }

        if (!delimiter) {
            delimiter = SquishyIO.DELIMITER
        }

        return content.split(/[\n|\r\n]/g).map((line: string) => {
            return line.trim()
        }).filter((line: string) => {
            return !!(line)
        }).map((line: string) => {
            const values: string[] = line.split(delimiter)
            return values.map((value: string) => {
                return value.trim()
            })
        })
    }

    numberToString(x: number): string {
        return `${x}`.replace(/\./g, ",")
    }

}