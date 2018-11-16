import { Observable, Observer } from 'rxjs';

export class LocalStorageExtensions {
    static getItem(key: string, isNotJson?: boolean): Observable<any> {
        let source = Observable.create((observer: Observer<any>) => {
            let data = localStorage.getItem(key);
            if (data) {
                observer.next(isNotJson ? data : JSON.parse(data));
            } else {
                observer.next(data);
            }
            observer.complete();
        });

        return source;
    }

    static setItem(key: string, value: any, isNotJson?: boolean) {
        localStorage.setItem(key, isNotJson ? value : JSON.stringify(value));
    }

    static remove(key: string) {
        localStorage.removeItem(key);
    }
}
