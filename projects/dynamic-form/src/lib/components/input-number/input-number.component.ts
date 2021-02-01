import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormNumber} from '../../classes/dynamic-form.classes';

@Component({
    selector: 'dynamic-form-number',
    template: `
        <label [formGroup]="fg" [ngClass]="question.style" [attr.for]="question.id">
          <span *ngIf="question.label">{{question.label}}</span>
            <input type="number"
                   [id]="question.id"
                   [formControl]="question"
                   [ngClass]="question.errors ? 'form-control-invalid' : ''"
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

    constructor() {
    }

    ngOnInit(): void {
    }
}
