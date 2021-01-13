import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFormComponent} from './dynamic-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DynamicFormTemplateDirective} from './shared/dynamic-form-template.directive';
import {DynamicFormService} from './shared/dynamic-form.service';
import {InputNumberComponent} from './components/input-number/input-number.component';
import {InputTextComponent} from './components/input-text/input-text.component';
import {InputCheckboxComponent} from './components/input-checkbox/input-checkbox.component';
import {SelectComponent} from './components/select/select.component';
import {ErrorMessageComponent} from './components/error-message/error-message.component';
import {DynamicFormBuilder} from './classes/dynamic-form.classes';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormTemplateDirective,
    InputNumberComponent,
    InputTextComponent,
    InputCheckboxComponent,
    SelectComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DynamicFormService,
    DynamicFormBuilder
  ],
  exports: [DynamicFormComponent, DynamicFormTemplateDirective]
})
export class DynamicFormModule {
}
