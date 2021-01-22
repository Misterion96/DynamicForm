import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormNumber} from '../../classes/dynamic-form.classes';
import {IFormChangeEvent} from '../../interfaces/dynamic-form.interface';

@Component({
    selector: 'dynamic-form-number',
    template: `
        <label [formGroup]="fg" [ngClass]="question.style" [attr.for]="question.id">{{question.label}}
            <input type="number"
                   [id]="question.id"
                   [formControlName]="question.key"
                   [ngClass]="question.errors ? 'form-control-invalid' : ''"
                   (change)="onChangeForm.emit({type: question.controlType, key: question.key, value: question.value})"
            >
        </label>
        <error-message [showError]="question.invalid || (question.touched && question.invalid)"></error-message>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class InputNumberComponent implements OnInit {
    @Input() fg: FormGroup;
    @Input() question: FormNumber;
    @Output() onChangeForm: EventEmitter<IFormChangeEvent> = new EventEmitter<IFormChangeEvent>();

    constructor() {
    }

    ngOnInit(): void {
    }
}
