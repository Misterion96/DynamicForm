import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormDropDown} from '../../classes/dynamic-form.classes';

@Component({
  selector: 'dynamic-form-select',
  template: `
    <label [formGroup]="fg" [ngClass]="question.style" [attr.for]="question.id">
    {{question.label}}
    <select [formControlName]="question.key"
            [attr.name]="question.key"
            [id]="question.id"
           >
      <option *ngFor="let option of question.items" [ngValue]="option.value">{{option.label}}</option>
    </select>
  </label>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent implements OnInit {
  @Input() fg: FormGroup;
  @Input() question: FormDropDown;

  constructor() { }

  ngOnInit(): void {
  }

}
