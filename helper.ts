import BigNumber from 'bignumber.js'

export class Helpers {
    static isObject(value: any): boolean {
        return !!value && value.constructor === Object
    }

    static isObjectEmpty(value: any): boolean {
        for (const _key in value) return false
        return true
    }

    static isFunction(value: any): boolean {
        return typeof value === 'function'
    }

    static isHex(value: any): boolean {
        return typeof value === 'string' && !Number.isNaN(parseInt(value, 16)) && /^(0x|)[a-fA-F0-9]+$/.test(value)
    }

    static isInteger(value: any): boolean {
        if (!value) return false
        return typeof value === 'number' && Number.isInteger(Number(value))
    }

    static isString(value: any): boolean {
        if (!value) return false
        return typeof value === 'string' || (typeof value === 'object' && value.constructor === String)
    }

    static isArray(value: any): boolean {
        return Array.isArray(value)
    }

    static isJson(value: any): boolean {
        if (!(value && typeof value === 'string')) {
            return false
        }
        try {
            JSON.parse(value)
            return true
        } catch (error) {
            return false
        }
    }

    static isBoolean(value: any): boolean {
        return typeof value === 'boolean'
    }

    static isNotNullOrUndefined(value: any): boolean {
        return value !== null && typeof value !== 'undefined'
    }

    static isValidHex(value: any): boolean {
        return /^(0x|)[a-fA-F0-9]+$/.test(value)
    }

    static hasProperty(obj: object, property: string): boolean {
        return obj && Object.prototype.hasOwnProperty.call(obj, property)
    }

    static hasProperties(obj: object, properties: string[]): boolean {
        return !!(properties.length && !properties.map((property: string): boolean => this.hasProperty(obj, property)).includes(false))
    }

    static hasWalletCtx(context: any): boolean {
        return !!(Object.prototype.hasOwnProperty.call(window, context) && window[context])
    }

    static toDecimal(value: string, dec: number): string {
        const v = new BigNumber(value)
        if (v.isNaN()) {
            return '0'
        }
        return v.times(new BigNumber(10).pow(dec)).toFixed()
    }

    static fromDecimal(value: string, dec: number): string {
        const v = new BigNumber(value)
        if (v.isNaN()) {
            return '0'
        }
        return v.div(new BigNumber(10).pow(dec)).toFixed()
    }
}
