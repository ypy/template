import { OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export abstract class SubscriptionDisposable implements OnDestroy {
    protected _isDestroyed: boolean;
    protected _isDestroyedSubject = new ReplaySubject<boolean>(1);

    constructor() {
        if (this.ngOnDestroy !== SubscriptionDisposable.prototype.ngOnDestroy) {
            let onDestroyFunc = this.ngOnDestroy.bind(this);

            this.ngOnDestroy = () => {
                onDestroyFunc();
                SubscriptionDisposable.prototype.ngOnDestroy.bind(this)();
            };
        }
    }

    public get isDestroyed(): Observable<boolean> {
        return this._isDestroyedSubject.asObservable();
    }

    public ngOnDestroy() {
        this._isDestroyed = true;
        this._isDestroyedSubject.next(true);
        this._isDestroyedSubject.complete();
    }
}
