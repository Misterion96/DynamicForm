import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormRange} from '../../classes/dynamic-form.classes';
import {IFormChangeEvent} from '../../interfaces/dynamic-form.interface';

@Component({
  selector: 'dynamic-form-range',
  template: `
    <label [formGroup]="fg" [ngClass]="question.style" [attr.for]="question.id">
      <span class="form-control-range-label">
        {{question.label}}
        <span *ngIf="question.options.showValue">: {{question.value}}</span>
      </span>
      <span class="form-control-range-value">
        <span class="form-control-range-minValue">{{question.options.min}}</span>
              <input type="range"
                     [id]="question.id"
                     [min]="question.options.min"
                     [max]="question.options.max"
                     [formControlName]="question.key"
                     (change)="onChangeForm.emit({type: question.controlType, key: question.key, value: question.value})"
              >
        <span class="form-control-range-maxValue">{{question.options.max}}</span>
      </span>

    </label>
    <error-message [showError]="question.invalid || (question.touched && question.invalid)"></error-message>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputRangeComponent implements OnInit {

  @Input() fg: FormGroup;
  @Input() question: FormRange;
  @Output() onChangeForm: EventEmitter<IFormChangeEvent> = new EventEmitter<IFormChangeEvent>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
