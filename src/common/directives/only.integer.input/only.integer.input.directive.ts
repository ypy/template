import { Directive, HostListener, Input } from '@angular/core';
import { KeyBoardKeys } from '../../constants/key.board.keys';
import { isNullOrUndefined } from '../../extensions';

@Directive({
    selector: '[igOnlyIntegerInput]'
})
export class OnlyIntegerInputDirective {
    @Input() public minValue: number;
    @Input() public maxValue: number;
    @Input() igOnlyIntegerInput: boolean;
    @Input() setValue: (value: string) => void;

    @HostListener('keydown', ['$event'])
    onKeyDown(event) {
        let e = <KeyboardEvent> event;
        if (this.igOnlyIntegerInput) {
            if ([
                    KeyBoardKeys.Delete,
                    KeyBoardKeys.Backspace,
                    KeyBoardKeys.Tab,
                    KeyBoardKeys.Escape,
                    KeyBoardKeys.Enter
                ].indexOf(e.keyCode) !== -1 ||
                (e.ctrlKey &&
                    // Allow: Ctrl+A
                    ((e.keyCode === KeyBoardKeys.A) ||
                        // Allow: Ctrl+C
                        (e.keyCode === KeyBoardKeys.C) ||
                        // Allow: Ctrl+X
                        (e.keyCode === KeyBoardKeys.X) ||
                        // Allow: Ctrl+V
                        (e.keyCode === KeyBoardKeys.V) ||
                        // Allow: Ctrl+Z
                        (e.keyCode === KeyBoardKeys.Z))) ||
                // Allow: home, end, left, right
                (
                    e.keyCode === KeyBoardKeys.Home ||
                    e.keyCode === KeyBoardKeys.End ||
                    e.keyCode === KeyBoardKeys.LeftArrow ||
                    e.keyCode === KeyBoardKeys.RightArrow
                )) {
                // let it happen, don't do anything
                return undefined;
            }

            if (e.keyCode === KeyBoardKeys.UpArrow) {
                return this.increase(e);
            }

            if (e.keyCode === KeyBoardKeys.DownArrow) {
                return this.decrease(e);
            }

            // Handle decimal dot
            if (KeyBoardKeys.Period === e.keyCode || KeyBoardKeys.DecimalPoint === e.keyCode) {
                return e.preventDefault();
            }

            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < KeyBoardKeys.Zero || e.keyCode > KeyBoardKeys.Nine)) &&
                (e.keyCode < KeyBoardKeys.Numpad0 || e.keyCode > KeyBoardKeys.Numpad9)) {
                return e.preventDefault();
            }

        }
        return undefined;
    }

    @HostListener('paste', ['$event'])
    private onPaste(event) {
        if (this.igOnlyIntegerInput) {
            let e = <ClipboardEvent> event;
            let newValue = parseInt(e.clipboardData.getData('Text'));

            if (isNaN(newValue)) {
                e.preventDefault();
            }
        }
    }

    private increase(e: any) {
        let value = parseInt(e.target['value']);

        if (isNaN(value)) {
            value = 0;
        }

        value++;

        if (isNullOrUndefined(this.maxValue) || value <= this.maxValue) {
            this.setValue(value.toString());
        }

        return e.preventDefault();
    }

    private decrease(e: any) {
        let value = parseInt(e.target['value']);

        if (isNaN(value)) {
            value = 0;
        }

        value--;

        if (isNullOrUndefined(this.minValue) || value >= this.minValue) {
            this.setValue(value.toString());
        }

        return e.preventDefault();
    }
}
