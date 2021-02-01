import {ChangeDetectionStrategy, Component, Input, OnInit,  ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormText} from '../../classes/dynamic-form.classes';

@Component({
    selector: 'dynamic-form-text',
    template: `
        <label [formGroup]="fg" [ngClass]="question.style" [attr.for]="question.id">
            <span class="form-control">{{question.label}}</span>
            <input [type]="question.controlType"
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
export class InputTextComponent implements OnInit {
    @Input() fg: FormGroup;
    @Input() question: FormText;

    constructor() {
    }

    ngOnInit(): void {
    }

}
