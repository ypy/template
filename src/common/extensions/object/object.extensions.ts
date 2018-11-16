import { isFunction } from './object.detect.extensions';

let pristineObj = {};

export function bindFunctionsToThis(obj: any) {
    if (!obj) {
        return obj;
    }

    for (let key in obj) {
        if (!pristineObj.hasOwnProperty(key)) {
            let property = obj[key];
            if (isFunction(property)) {
                obj[key] = property.bind(obj);
            }
        }
    }
    return undefined;
}

export function clone<T>(obj: T): T {
    if (!!obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    return obj;
}

export function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

export function mergeDeep(target, ...sources) {
    if (!sources.length) {
        return target;
    }

    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, {[key]: {}});
                }

                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, {[key]: source[key]});
            }
        }
    }

    return mergeDeep(target, ...sources);
}