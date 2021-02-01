import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormCheckBox} from '../../classes/dynamic-form.classes';

@Component({
  selector: 'dynamic-form-checkbox',
  template: `
    <label [formGroup]="fg" [ngClass]="question.style" [attr.for]="question.id">
      <input type="checkbox"
             [id]="question.id"
             [formControl]="question"
             [ngClass]="question.errors ? 'form-control-invalid' : ''"
      >
      {{question.label}}
    </label>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InputCheckboxComponent implements OnInit {
  @Input() fg: FormGroup;
  @Input() question: FormCheckBox;

  constructor() {
  }

  ngOnInit(): void {
  }

}
