import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormRange} from '../../classes/dynamic-form.classes';

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
                     [formControl]="question"
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

  constructor() {
  }

  ngOnInit(): void {
  }

}
