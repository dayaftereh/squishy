import * as dayjs from "dayjs";
import * as xmldom from 'xmldom'

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
}