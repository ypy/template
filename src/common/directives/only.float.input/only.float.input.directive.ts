import {Directive, HostListener, Input} from '@angular/core';
import {KeyBoardKeys} from '../../constants/key.board.keys';
import '../../extensions/string/string.extensions';

@Directive({
  selector: '[igOnlyFloatInput]'
})
export class OnlyFloatInputDirective {
  @Input() igOnlyFloatInput: boolean;
  @Input() decimalPlaces: number;
  @Input() setValue: (value: string) => void;

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    let e = <KeyboardEvent> event;
    if (this.igOnlyFloatInput) {
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
        e.preventDefault();
      }

      if (e.keyCode === KeyBoardKeys.DownArrow) {
        e.preventDefault();
      }

      // Handle decimal dot
      if (KeyBoardKeys.Period === e.keyCode || KeyBoardKeys.DecimalPoint === e.keyCode || KeyBoardKeys.Comma === e.keyCode) {
        if (event.srcElement.value.indexOf(',') !== -1 || event.srcElement.value.indexOf('.') !== -1) {
          e.preventDefault();
        }
      } else {
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < KeyBoardKeys.Zero || e.keyCode > KeyBoardKeys.Nine)) &&
          (e.keyCode < KeyBoardKeys.Numpad0 || e.keyCode > KeyBoardKeys.Numpad9)) {
          e.preventDefault();
        }
      }

      this.restrictDecimalPlaces(event);
    }

    return undefined;
  }

  @HostListener('paste', ['$event'])
  public onPaste(event) {
    if (this.igOnlyFloatInput) {
      let e = <ClipboardEvent> event;

      let pastedString = e.clipboardData.getData('Text');
      let pastedValue = parseFloat(pastedString);
      let currentValue = event.srcElement.value;

      if (isNaN(pastedValue)) {
        e.preventDefault();
      } else if (currentValue.isDecimal() && pastedString.isDecimal()) {
        e.preventDefault();
      }

      this.restrictDecimalPlaces(e);
    }
  }

  private restrictDecimalPlaces(event) {
    setTimeout(() => {
      if (event.srcElement.value.indexOf(',') !== -1 || event.srcElement.value.indexOf('.') !== -1) {
        let value = event.srcElement.value;
        let dotPosition = value.indexOf(',') + 1;

        if (dotPosition === 0) {
          dotPosition = value.indexOf('.') + 1;
        }

        let fractionalPart = value.substr(dotPosition, this.decimalPlaces);

        this.setValue(value.substr(0, dotPosition) + fractionalPart);
      }
    }, 0);
  }
}
