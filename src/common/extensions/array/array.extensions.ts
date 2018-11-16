interface Array<T> {
    any(predicate?: (item: T) => boolean): boolean;

    all(predicate: (item: T) => boolean): boolean;

    first(matchFunc?: (item: T) => boolean): T;

    last(): T;

    removeDuplicate(): any;

    flatMap(predicateFunc?: (item: T) => Array<any>): Array<any>;

    min(): T;

    sortBy(valueGetter: (item: T) => any, desc?: boolean): Array<T>;

    groupBy(keyGetter: (P: T) => string, valueGetter?: (P: T) => any): { [key: string]: Array<any> };

    uniqueElements(): Array<T>;

    getElementIndex(predicateFunc: (item: T) => boolean): number;

    replaceElement(indexGetter: number | ((item: T) => boolean), newElement: T): void;

    getRandom(): T;
}

Array.prototype.any = function <T>(predicate?: (T) => boolean): boolean {
    if (!predicate) {
        return this.length > 0;
    }

    let isMatchedAny = false;

    this.every(item => {
        if (predicate(item)) {
            isMatchedAny = true;

            return false;
        }

        return true;
    });

    return isMatchedAny;
};

Array.prototype.first = function <T>(matchFunc?: (T) => boolean): T {
    if (matchFunc) {
        return this.filter(x => matchFunc(x))[0];
    } else {
        if (this.length > 0) {
            return this[0];
        }

        return null;
    }
};

Array.prototype.last = function <T>(): T {

    if (this.length > 0) {
        return this[this.length - 1];
    }

    return null;
};

Array.prototype.all = function (predicateFunc: (T) => boolean): boolean {
    let isAllMatched = true;

    this.every(item => {
        if (!predicateFunc(item)) {
            isAllMatched = false;

            return false;
        }

        return true;
    });

    return isAllMatched;
};

Array.prototype.sortBy = function <T>(valueGetter: (T) => any, desc = false): Array<T> {
    return this.sort((a, b) => {
        let valueA = valueGetter(a);
        let valueB = valueGetter(b);

        if (valueA > valueB) {
            return desc ? -1 : 1;
        } else if (valueA < valueB) {
            return desc ? 1 : -1;
        }

        return 0;
    });
};

Array.prototype.groupBy = function <T>(keyGetter: (P: T) => string, valueGetter?: (P: T) => any): { [key: string]: Array<any> } {
    let result = {};
    this.forEach(item => {
        if (!result[keyGetter(item)]) {
            result[keyGetter(item)] = [];
        }
        result[keyGetter(item)].push(valueGetter ? valueGetter(item) : item);
    });
    return result;
};

Array.prototype.flatMap = function <T>(predicateFunc?: (T) => Array<any>): Array<any> {
    return Array.prototype.concat.apply([], !predicateFunc ? this : this.map(x => predicateFunc(x)));
};

Array.prototype.min = function <T>(): T {
    let minValue = this[0];

    for (let value of this) {
        if (value <= minValue) {
            minValue = value;
        }
    }

    return minValue;
};

Array.prototype.uniqueElements = function <T>(): Array<T> {
    return Array.from(new Set(this as Array<T>));
};

Array.prototype.getElementIndex = function <T>(predicateFunc: (T) => boolean): number {
    let foundIndex = -1;

    this.every((element, index) => {
        if (predicateFunc(element)) {
            foundIndex = index;

            return false;
        }

        return true;
    });

    return foundIndex;
};

Array.prototype.replaceElement = function <T>(indexGetter: number | ((T) => boolean), newElement: T): void {
    let index = -1;

    if (typeof indexGetter === 'number') {
        index = indexGetter;
    } else if (typeof indexGetter === 'function') {
        index = this.getElementIndex(indexGetter);
    }

    if (index === -1 || index >= this.length) {
        throw new Error(`Can't find special element to be replace`);
    }

    this.splice(index, 1, newElement);
};

Array.prototype.removeDuplicate = function (): any {

    if (this && this.length > 0) {
        let newArray = [];
        this.forEach(x => {
            if (!newArray.first(y => y === x)) {
                newArray.push(x);
            }
        });
        return newArray;
    }

    return [];
};

Array.prototype.getRandom = function <T>(): T {
    let index = Math.floor((Math.random() * this.length));
    return this[index];
};