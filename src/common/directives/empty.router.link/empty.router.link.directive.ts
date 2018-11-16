/*tslint:disable:directive-selector*/

import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
    selector: '[routerLink]'
})
export class EmptyRouterLinkDirective implements OnChanges {
    @Input() routerLink: any;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {
    }

    ngOnChanges() {
        if (this.routerLink == null) {
            setTimeout(() => this.renderer.removeAttribute(this.elRef.nativeElement, 'href'), 0);
        }
    }
}
