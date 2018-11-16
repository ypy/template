import { Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from '../../extensions';

@Component({
    selector: 'bt-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FieldComponent),
            multi: true
        }
    ],
    host: {
        '[class]': `class`
    }
})
export class FieldComponent implements ControlValueAccessor {
    private _value: string;
    private _notifyChange: any;

    public isFocused: boolean;
    public errorText: string;
    @Input() public type = 'text';
    @Input() public class = 'text';
    @Input() public label: string;
    @Input() public icon: string;
    @Input() public readonly: boolean;
    @Input() public formControl: FormControl;
    @Input() public customErrorTexts: any;

    public get value() {
        return this._value;
    }

    public set value(newValue: any) {
        if (newValue === this._value || (isNullOrUndefined(this._value) && isNullOrUndefined(newValue))) {
            return;
        }

        this._value = newValue;

        if (this._notifyChange && this.formControl && this.formControl.value !== newValue) {
            this._notifyChange(newValue);
        }

        this.updateErrorText();
    }

    public writeValue(newValue: any): void {
        this._value = newValue;
    }

    public registerOnChange(fn: any): void {
        this._notifyChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public onFocus() {
        this.isFocused = true;
    }

    public onBlur() {
        this.isFocused = false;
        this.updateErrorText();
    }

    public updateErrorText() {
        this.errorText = '';

        if (this.formControl && this.formControl.dirty && this.formControl.errors) {
            for (let key of Object.keys(this.formControl.errors)) {
                if (!!this.customErrorTexts) {
                    const customErrorText = this.customErrorTexts[key];

                    if (customErrorText) {
                        this.errorText = customErrorText;
                        return;
                    }
                }

                switch (key) {
                    case 'required':
                        return this.errorText = 'This field is required';

                    case 'incorrectEmailFormat':
                        return this.errorText = 'Incorrect email format';
                }
            }
        }
    }
}
