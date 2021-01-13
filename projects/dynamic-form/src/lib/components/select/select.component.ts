import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormDropDown} from '../../classes/dynamic-form.classes';
import {IFormChangeEvent} from '../../interfaces/dynamic-form.interface';

@Component({
  selector: 'dynamic-form-select',
  template: `
    <label [formGroup]="fg" [ngClass]="question.style" [attr.for]="question.id">
    {{question.label}}
    <select [formControlName]="question.key"
            [attr.name]="question.key"
            [id]="question.id"
            (ngModelChange)="onChangeForm.emit({type: question.controlType, key: question.key, value: $event})"
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
  @Output() onChangeForm: EventEmitter<IFormChangeEvent> = new EventEmitter<IFormChangeEvent>();
  constructor() { }

  ngOnInit(): void {
  }

}
