import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[igVisibilityHidden]'
})
export class VisibilityHiddenDirective implements OnChanges, OnInit {
    @Input() public icVisibilityHidden: boolean;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {
    }

    public ngOnInit() {
        this.updateVisibility();
    }

    public ngOnChanges() {
        this.updateVisibility();
    }

    private updateVisibility() {
        this.renderer.setStyle(this.elRef.nativeElement, 'visibility',
            this.icVisibilityHidden ? 'hidden' : 'unset');

        this.renderer.setStyle(this.elRef.nativeElement, 'overflow-y',
            this.icVisibilityHidden ? 'hidden' : 'unset');

        this.renderer.setStyle(this.elRef.nativeElement, 'height',
            this.icVisibilityHidden ? '0' : 'unset');

        this.renderer.setStyle(this.elRef.nativeElement, 'display',
            this.icVisibilityHidden ? 'block' : 'unset');
    }
}
