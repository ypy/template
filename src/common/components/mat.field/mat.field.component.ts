import { AfterViewInit, Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, fromEvent } from 'rxjs';
import { bindFunctionsToThis, isNullOrUndefined } from '../../extensions';
import { BaseComponent } from '../base.component';

@Component({
    selector: 'bt-mat-field',
    templateUrl: './mat.field.component.html',
    styleUrls: ['./mat.field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MatFieldComponent),
            multi: true
        }
    ],
    host: {
        '[class]': `class`,
        '[class.isDirty]': 'isDirty'
    }
})
export class MatFieldComponent extends BaseComponent implements ControlValueAccessor,
    AfterViewInit, OnInit, OnDestroy {

    private isFocusedOnce: boolean;
    private _value: string;
    private _notifyChange: any;
    private oldUpdateValueAndValidity: any;
    @ViewChild('inputElement') private inputElement: ElementRef;

    public errorMessage: string;
    @Input() public class = '';
    @Input() public maxLength: number;
    @Input() public minValue: number;
    @Input() public maxValue: number;
    @Input() public label: string;
    @Input() public decimalPlaces = 1;
    @Input() public type: 'number' | 'float' | 'text' | 'textArea' | 'password';
    @Input() public disabled: boolean;
    @Input() public customErrorMessages: any;
    @Input() public hideValidationMessages: boolean;
    @Input() public isRequired = false;
    @Input('formControl') public formControl: FormControl;

    public get inputType() {
        switch (this.type) {
            case 'password':
                return 'password';
            case 'text':
            case 'textArea':
              return 'textArea';
            default:
                return 'text';
        }
    }

    public get value() {
        return this._value;
    }

    public set value(newValue: any) {
        if (newValue === this._value || (isNullOrUndefined(this._value) && isNullOrUndefined(newValue))) {
            return;
        }

        this.setValue(newValue);
    }

    public get isDirty() {
        return this.isFocusedOnce && this.formControl && (this.formControl.dirty || this.formControl.touched);
    }

    constructor() {
        super();
        bindFunctionsToThis(this);
    }

    public ngOnInit() {
        if (this.formControl) {
            let oldMarkAsPristine = this.formControl.markAsPristine.bind(this.formControl);
            this.oldUpdateValueAndValidity = this.formControl.updateValueAndValidity
                .bind(this.formControl);

            this.formControl.markAsPristine = (options) => {
                oldMarkAsPristine(options);
                this.errorMessage = '';

                if (this.inputElement) {
                    this.inputElement.nativeElement.setCustomValidity(this.errorMessage);
                }
            };

            this.formControl.updateValueAndValidity = (options) => {
                if (options && options['displayErrorMessage']) {
                    this.isFocusedOnce = true;
                    this.formControl.markAsDirty();
                }

                this.updateValidationState(options);
            };
        }
    }

    public ngAfterViewInit() {
        this.bindInputRestrictions();
    }

    public ngOnDestroy() {
        if (this.formControl) {
            this.formControl.updateValueAndValidity = this.oldUpdateValueAndValidity;
        }

        super.ngOnDestroy();
    }

    public writeValue(obj: any): void {
        this.value = obj;
    }

    public registerOnChange(fn: any): void {
        this._notifyChange = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public setValue(newValue: any) {
        switch (this.type) {
            case 'number':
                newValue = newValue && parseInt(newValue);
                this._value = newValue;
                break;
            case 'float':
                if (newValue && (newValue.toString() === ',' || newValue.toString() === '.')) {
                    newValue = '0' + newValue;
                }
                newValue = newValue && parseFloat(newValue.toString().replace(',', '.'));
                this._value = newValue && (newValue.toString().replace('.', ','));
                break;
            default :
                this._value = newValue;
        }

        if (this._notifyChange && this.formControl && this.formControl.value !== newValue) {
            this._notifyChange(newValue);
        }

        this.updateValidationState();
    }

    public onBlur() {
        this.isFocusedOnce = true;
    }

    private updateValidationState(options?) {

        if (this.formControl && this.oldUpdateValueAndValidity) {
            // Use this hack way to update FormControl value immediately
            this.formControl['_value'] = this._value;

            this.oldUpdateValueAndValidity(options);

            if (this.inputElement) {
                this.errorMessage = '';
                this.inputElement.nativeElement.setCustomValidity(this.errorMessage);
            }
        }
    }

    private bindInputRestrictions() {
        fromEvent(this.inputElement.nativeElement, 'input').subscribe(() => {
            if (this.maxLength && this.inputElement.nativeElement.value.length > this.maxLength) {
                let caretStart = this.inputElement.nativeElement.selectionStart;

                this.inputElement.nativeElement.value = this.inputElement.nativeElement.value.substr(0, this.maxLength);
                this.inputElement.nativeElement.setSelectionRange(caretStart, caretStart);
                this.value = this.inputElement.nativeElement.value;
            }
        });
    }
}
