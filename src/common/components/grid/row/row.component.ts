import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'bt-row',
    template: `
        <ng-content></ng-content>
    `,
    host: {
        '[class]': 'className'
    },
    encapsulation: ViewEncapsulation.None
})
export class RowComponent implements OnInit, OnChanges{
    public className: string;
    @Input() public class = '';
    @Input() public distribution: 'around' | 'between';
    @Input() public reverse: boolean;
    @Input() public pinLeft: boolean;
    @Input() public pinCenter: boolean;
    @Input() public pinRight: boolean;
    @Input() public alignTop: boolean;
    @Input() public alignMiddle: boolean;
    @Input() public alignBottom: boolean;

    public ngOnInit() {
        this.rebindClassName();
    }

    public ngOnChanges() {
        this.rebindClassName();
    }

    private rebindClassName() {
        let className = `row ${this.class} `;

        if (this.reverse) {
            className += `reverse `;
        }

        if (this.pinLeft) {
            className += `start-xs `;
        }

        if (this.pinCenter) {
            className += `center-xs `;
        }

        if (this.pinRight) {
            className += `end-xs `;
        }

        if (this.alignTop) {
            className += `top-xs `;
        }

        if (this.alignMiddle) {
            className += `middle-xs `;
        }

        if (this.alignBottom) {
            className += `bottom-xs `;
        }

        if (!!this.distribution) {
            className += `${this.distribution}-xs `;
        }

        this.className = className;
    }
}
