import { Component, Input } from '@angular/core';

@Component({
    selector: 'bt-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
    @Input() public diameter = 32;
    @Input() public strokeWidth = 3;

    constructor() {
    }
}
