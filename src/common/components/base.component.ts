import { ActivatedRoute, Params } from '@angular/router';
import { isNullOrUndefined } from 'util';
// import { config } from '../../../config/config';
// import { PlaceCategory, placeCategoryEnum } from '../constants/constant';
import { SubscriptionDisposable } from './subscription.disposable';

export class BaseComponent extends SubscriptionDisposable {
    public allRouteParams: Params;
    public mobileMenuTitle = 'Menu';
    public isMobile = false;

    constructor(public componentOptions: BaseComponentOption = new BaseComponentOption) {
        super();
    // ?this.isMobile = window.innerWidth < config.phoneSizeWidth;

        // if (componentOptions.activatedRoute) {
        //     let allParams = componentOptions.activatedRoute.params;
        //     let parent = componentOptions.activatedRoute.parent;
        //     let child = componentOptions.activatedRoute.firstChild;
        //     while (!isNullOrUndefined(child)) {
        //         allParams = allParams.combineLatest(child.params, (a, b) => Object.assign({}, a, b));
        //         child = child.firstChild;
        //     }

        //     while (!isNullOrUndefined(parent)) {
        //         allParams = allParams.combineLatest(parent.params, (a, b) => Object.assign({}, a, b));
        //         parent = parent.parent;
        //     }

        //     allParams.takeUntil(this.isDestroyed)
        //         .subscribe(params => {
        //             if (params.category) {
        //                 params.category = PlaceCategory.getPlaceCategoryValue(params.category);
        //             }

        //             this.allRouteParams = params;
        //         });
        // }
    }
}

export class BaseComponentOption {
    activatedRoute?: ActivatedRoute;
}
