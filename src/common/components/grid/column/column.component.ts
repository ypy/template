import { Component, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'bt-col',
    styleUrls: ['./column.component.scss'],
    template: `
        <ng-content></ng-content>
    `,
    host: {'[class]': 'className'},
    encapsulation: ViewEncapsulation.None
})
export class ColumnComponent implements OnInit, OnChanges {
    public className: string;
    @Input() public class = '';
    @Input() public lg: number;
    @Input() public md: number;
    @Input() public sm: number;
    @Input() public xs: number;
    @Input() public lgOffset: number;
    @Input() public mdOffset: number;
    @Input() public smOffset: number;
    @Input() public xsOffset: number;
    @Input() public autoWidth: boolean;

    public ngOnInit() {
        this.rebindClassName();
    }

    public ngOnChanges() {
        this.rebindClassName();
    }

    private rebindClassName() {
        let className = `${this.class} `;

        if (!!this.lg) {
            className += `col-lg-${this.lg} `;
        }

        if (!!this.md) {
            className += `col-md-${this.md} `;
        }

        if (!!this.sm) {
            className += `col-sm-${this.sm} `;
        }

        if (!!this.xs) {
            className += `col-xs-${this.xs} `;
        }

        if (!!this.lgOffset) {
            className += `col-lg-offset-${this.lgOffset} `;
        }

        if (!!this.mdOffset) {
            className += `col-md-offset-${this.mdOffset} `;
        }

        if (!!this.smOffset) {
            className += `col-sm-offset-${this.smOffset} `;
        }

        if (!!this.xsOffset) {
            className += `col-xs-offset-${this.xsOffset} `;
        }

        if (this.autoWidth) {
            className += `col-xs `;
        }

        this.className = className;
    }
}
