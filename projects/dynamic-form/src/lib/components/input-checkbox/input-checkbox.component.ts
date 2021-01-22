import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormCheckBox} from '../../classes/dynamic-form.classes';
import {IFormChangeEvent} from '../../interfaces/dynamic-form.interface';

@Component({
  selector: 'dynamic-form-checkbox',
  template: `
    <label [formGroup]="fg" [ngClass]="question.style" [attr.for]="question.id">
      <input type="checkbox"
             [id]="question.id"
             [formControlName]="question.key"
             (change)="onChangeForm.emit({type: question.controlType, key: question.key, value: question.value})"
      >
      {{question.label}}
    </label>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InputCheckboxComponent implements OnInit {
  @Input() fg: FormGroup;
  @Input() question: FormCheckBox;
  @Output() onChangeForm: EventEmitter<IFormChangeEvent> = new EventEmitter<IFormChangeEvent>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
