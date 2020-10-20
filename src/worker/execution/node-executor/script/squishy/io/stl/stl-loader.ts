import { Buffer } from 'buffer/';
import { STLResult } from './stl-result';

/**
 * STL file loader for STL ASCII files, as created by Solidworks and other CAD programs.
 * Supports both binary and ASCII encoded files, with automatic detection of type.
 * 
 * <b>Limitations:</b>
 * > Binary decoding supports "Magics" color format [Color_in_binary_STL](http://en.wikipedia.org/wiki/STL_(file_format)#Color_in_binary_STL).
 * > There is perhaps some question as to how valid it is to always assume little-endian-ness.
 * > ASCII decoding assumes file is UTF-8.
 */
export class STLLoader {

    private static STL_COLOR_BYTES: number = 10
    private static STL_HEADER_BYTES: number = 80

    /**
     * creates a new STLLoader
     * @param onProgress (optional) the callback for the progress completed
     */
    constructor(private readonly onProgress?: (p: number) => void) {

    }

    /**
     * parse the given data as stl file
     * @param data the stl file content as array buffer
     */
    parse(data: ArrayBuffer): STLResult {
        // check if the stl file is binary
        const binary: boolean = this.isBinary(data)
        // if binary parse as binary
        if (binary) {
            const result: STLResult = this.parseBinary(data)
            return result
        }
        // if not binary parse as ascii
        const result: STLResult = this.parseASCII(data)
        return result
    }

    private isBinary(data: ArrayBuffer): boolean {
        const buf: Buffer = Buffer.from(data)
        // read the count of faces
        const faces: number = buf.readUInt32LE(STLLoader.STL_HEADER_BYTES)
        // calculate the size of one face in bytes
        const faceSize: number = (32 / 8 * 3) + ((32 / 8 * 3) * 3) + (16 / 8)
        // calculate the expected file size
        const expectBytes: number = STLLoader.STL_HEADER_BYTES + (32 / 8) + (faces * faceSize)

        // check if the byte length matched
        if (expectBytes === buf.byteLength) {
            return true
        }

        // An ASCII STL data must begin with 'solid ' as the first six bytes.
        // However, ASCII STLs lacking the SPACE after the 'd' are known to be
        // plentiful.  So, check the first 5 bytes for 'solid'.

        // Several encodings, such as UTF-8, precede the text with up to 5 bytes:
        // https://en.wikipedia.org/wiki/Byte_order_mark#Byte_order_marks_by_encoding
        // Search for "solid" to start anywhere after those prefixes.

        // US-ASCII ordinal values for 's', 'o', 'l', 'i', 'd'
        const solid: number[] = [115, 111, 108, 105, 100]

        for (let offset: number = 0; offset < 5; offset++) {
            // If "solid" text is matched to the current offset, declare it to be an ASCII STL.
            if (this.matchBytesAt(solid, buf, offset)) {
                return false
            }
        }

        // Couldn't find "solid" text at the beginning; it is binary STL.
        return true
    }

    private matchBytesAt(query: number[], buf: Buffer, offset: number): boolean {
        // Check if each byte in query matches the corresponding byte from the current offset
        for (let i: number = 0; i < query.length; i++) {
            const q: number = query[i]
            const b: number = buf.readUInt8(offset + i)

            if (q !== b) {
                return false
            }
        }

        return true
    }

    private parseBinary(data: ArrayBuffer): STLResult {
        const buf: Buffer = Buffer.from(data)

        let hasColor: boolean = false
        let defaultR: number, defaultG: number, defaultB: number, defaultAlpha: number

        // process STL header
        // check for default color in header ("COLOR=rgba" sequence).
        const colorLength: number = STLLoader.STL_HEADER_BYTES - STLLoader.STL_COLOR_BYTES
        for (let index: number = 0; index < colorLength; index++) {
            // update the load progress
            this.emitProgress(index / buf.length)

            const colo: number = buf.readUInt32BE(index)
            const byteR: number = buf.readUInt8(index + 4)
            const byteEqual: number = buf.readUInt8(index + 5)

            // check if color in stl
            if (colo !== 0x434F4C4F /*COLO*/ || byteR !== 0x52 /*'R'*/ || byteEqual !== 0x3D /*'='*/) {
                continue
            }

            hasColor = true
            defaultR = buf.readUInt8(index + 6) / 255
            defaultG = buf.readUInt8(index + 7) / 255
            defaultB = buf.readUInt8(index + 8) / 255
            defaultAlpha = buf.readUInt8(index + 9) / 255
        }

        // create the result
        const result: STLResult = {
            normals: [],
            vertices: [],
            colors: hasColor ? [] : undefined
        }

        const dataOffset: number = STLLoader.STL_HEADER_BYTES + 4;
        const faceLength: number = 12 * 4 + 2;

        // read the count of faces
        const faces: number = buf.readUInt32LE(STLLoader.STL_HEADER_BYTES)
        for (let face: number = 0; face < faces; face++) {
            const offset: number = dataOffset + face * faceLength

            // update the load progress
            this.emitProgress(offset / buf.length)

            // parse the normals
            const normalX: number = buf.readFloatLE(offset)
            const normalY: number = buf.readFloatLE(offset + 4)
            const normalZ: number = buf.readFloatLE(offset + 8)

            // check if color
            let r: number, g: number, b: number

            if (hasColor) {
                // parse the color                
                const packedColor: number = buf.readUInt16LE(offset + 48)
                if ((packedColor & 0x8000) === 0) {
                    // facet has its own unique color
                    r = (packedColor & 0x1F) / 31;
                    g = ((packedColor >> 5) & 0x1F) / 31;
                    b = ((packedColor >> 10) & 0x1F) / 31;
                } else {
                    r = defaultR;
                    g = defaultG;
                    b = defaultB;
                }
            }

            for (let i: number = 1; i <= 3; i++) {
                const vertexOffset: number = offset + i * 12

                // update the load progress
                this.emitProgress(vertexOffset / buf.length)

                const vertexX: number = buf.readFloatLE(vertexOffset)
                const vertexY: number = buf.readFloatLE(vertexOffset + 4)
                const vertexZ: number = buf.readFloatLE(vertexOffset + 8)

                result.normals.push(normalX, normalY, normalZ)
                result.vertices.push(vertexX, vertexY, vertexZ)

                if (hasColor) {
                    result.colors.push(r, g, b)
                }
            }
        }


        return result
    }

    private parseASCII(data: ArrayBuffer): STLResult {
        const patternFace: RegExp = /facet([\s\S]*?)endfacet/g;
        const patternSolid: RegExp = /solid([\s\S]*?)endsolid/g;

        const patternFloat: string = /[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source;

        const patternVertex: RegExp = new RegExp('vertex' + patternFloat + patternFloat + patternFloat, 'g');
        const patternNormal: RegExp = new RegExp('normal' + patternFloat + patternFloat + patternFloat, 'g');

        // create the result
        const result: STLResult = {
            normals: [],
            vertices: [],
            colors: undefined
        }

        // parse the buffer
        const buf: Buffer = Buffer.from(data)
        // make the buffer to string
        const content: string = buf.toString('utf-8')

        let faceCounter: number = 0
        let regex: RegExpExecArray

        while ((regex = patternSolid.exec(content)) !== null) {
            const solid: string = regex[0]
            while ((regex = patternFace.exec(solid)) !== null) {
                // get the content for the face
                const text: string = regex[0]

                // update the load progress
                this.emitProgress(patternFace.lastIndex / solid.length)

                let normalCountPerFace: number = 0
                let normalX: number, normalY: number, normalZ: number
                while ((regex = patternNormal.exec(text)) !== null) {
                    normalX = parseFloat(regex[1])
                    normalY = parseFloat(regex[2])
                    normalZ = parseFloat(regex[3])
                    normalCountPerFace++
                }

                // every face have to own ONE valid normal
                if (normalCountPerFace !== 1) {
                    throw new Error(`STLLoader: Something is not right with the normal of face number [ ${faceCounter} ]`)
                }

                let vertexCountPerFace: number = 0
                while ((regex = patternVertex.exec(text)) !== null) {
                    vertexCountPerFace++

                    const vertexX: number = parseFloat(regex[1])
                    const vertexY: number = parseFloat(regex[2])
                    const vertexZ: number = parseFloat(regex[3])

                    result.normals.push(normalX, normalY, normalZ)
                    result.vertices.push(vertexX, vertexY, vertexZ)
                }

                // each face have to own THREE valid vertices
                if (vertexCountPerFace !== 3) {
                    throw new Error(`STLLoader: Something is not right with the vertices of face number [ ${faceCounter} ]`)
                }

                faceCounter++
            }
        }

        return result
    }

    private emitProgress(n: number): void {
        if (!this.onProgress) {
            return
        }
        this.onProgress(n)
    }

}