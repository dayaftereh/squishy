import * as buffer from 'buffer';
import * as dayjs from "dayjs";
import * as pngjs from 'pngjs/browser';
import * as xmldom from 'xmldom';
import * as mustache from 'mustache';

export class Plugins {
    /**
     * import from dayjs to parses, validates, manipulates, and displays dates
     * @see https://github.com/iamkun/dayjs
     */
    dayjs = dayjs

    /**
     * import from xmldom, which allows to parse xml or dom files
     * @see https://github.com/jindw/xmldom
     */
    xmldom = xmldom

    /**
     * import from pngjs, which is a simple PNG encoder/decoder in javascript
     * @see https://github.com/lukeapage/pngjs
     */
    pngjs = pngjs

    /**
     * import from buffer, which is the buffer module from node.js, for the browser.
     * @see https://github.com/feross/buffer
     * @see https://nodejs.org/api/buffer.html
     */
    buffer = buffer

    /**
     * import from mustache, which is the implementation of the mustache template system
     * @see https://github.com/janl/mustache.js
     * @see http://mustache.github.io/mustache.5.html
     */
    mustache = mustache
}