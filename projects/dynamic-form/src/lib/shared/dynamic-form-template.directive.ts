import {Directive, Input, TemplateRef} from '@angular/core';
import {TDynamicFormTemplate} from '../interfaces/dynamic-form.interface';

@Directive({
    selector: '[questTemplate]'
})
export class DynamicFormTemplateDirective {
    @Input('questTemplate') name: TDynamicFormTemplate[];
    constructor(public template: TemplateRef<any>) {}

    public getType(): string[] {
        return this.name;
    }
}
