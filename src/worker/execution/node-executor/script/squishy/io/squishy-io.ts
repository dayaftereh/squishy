import * as xmldom from 'xmldom'

export class SquishyIO {

    static NEWLINE: string = "\n"
    static DELIMITER: string = ';'
    static XML_MIME_TYPE: string = 'application/xml'
    static NF: Intl.NumberFormat = new Intl.NumberFormat(undefined, {
        maximumFractionDigits: 20
    })

    csvStringify(data: (unknown[][]) | undefined, toString?: (x: unknown) => string, delimiter?: string, newline?: string): string {
        if (!data) {
            return ''
        }

        if (!delimiter) {
            delimiter = SquishyIO.DELIMITER
        }

        if (!newline) {
            newline = SquishyIO.NEWLINE
        }

        if (!toString) {
            // create default to string
            toString = (x: unknown) => {
                return `${x}`
            }
        }

        return data.map((line: unknown[]) => {
            return line.map((value: unknown) => {
                return toString(value)
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

    xmlParse(content: string, options?: any, mimeType?: string): any {
        // set default mime type if needed
        if (!mimeType) {
            mimeType = SquishyIO.XML_MIME_TYPE
        }
        // create the parser
        const parser: any = new xmldom.DOMParser(options)
        // parse the document
        const document: any = parser.parseFromString(content, mimeType)

        return document
    }

    /**
     * converts the given number to a string based on the local browser language formatting
     * @param x the number to format
     */
    numberToLocal(x: number): string {
        return SquishyIO.NF.format(x)
    }

}