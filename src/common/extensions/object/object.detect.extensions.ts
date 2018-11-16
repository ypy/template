let pristineObj = {};

export function isTrue(value: boolean) {
    return value;
}

export function isFunction(functionToCheck) {
    return functionToCheck && pristineObj.toString.call(functionToCheck) === '[object Function]';
}

export function isNullOrUndefined(value) {
    return value === undefined || value === null;
}

export function isEmptyValue(value) {
    return value === undefined || value === null || value === '';
}

export function isNumber(value) {
    return !isNaN(value);
}

export function isNumberWithLength(obj: any, length: number) {
    if (!obj) {
        return false;
    }
    if (!isNumber(obj)) {
        return false;
    }

    let value = parseInt(obj);

    return !isNaN(value) && value.toString().length === length;
}

// export function isNumberWithLengthOrDefault(obj: string | number, length: number) {
//     if (!obj) {
//         return true;
//     }
//
//     return isNumberWithLength(parseInt(obj.toString().replaceAll(' ', '')), length);
// }

export function isEmail(email: string) {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return reg.test(email);
}

export function isEmailOrDefault(email: string) {
    if (isEmptyValue(email)) {
        return true;
    }

    return isEmail(email);
}
