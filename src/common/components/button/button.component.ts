import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {bindFunctionsToThis} from '../../extensions';

@Component({
  selector: 'bt-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
  public isLoading: boolean;
  @Input() public icon: string;
  @Input() public disabled: boolean;
  @Input() public size: 'lg' | 'md' = 'lg';
  @Input() public passClickEvent: boolean;
  @Input() public isAsync: boolean;
  @Input() public color: 'primary' | 'acent' | 'cancel' | 'warn' = 'primary';
  @Output() public trigger = new EventEmitter<ButtonTriggerEvent>();

  constructor() {
    bindFunctionsToThis(this);
  }

  public onClick($event: Event) {
    if (this.passClickEvent) {
      return;
    }

    $event.preventDefault();
    $event.stopPropagation();

    let triggerEvent: ButtonTriggerEvent = {
      complete: this.complete
    };

    if (this.isAsync) {
      this.load();
    }

    this.trigger.emit(triggerEvent);
  }

  private load() {
    this.isLoading = true;
  }

  private complete() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }
}

export class ButtonTriggerEvent {
  complete: () => void;
}
