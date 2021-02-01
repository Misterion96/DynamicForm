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
import { InputRangeComponent } from './components/input-range/input-range.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormTemplateDirective,
    InputNumberComponent,
    InputTextComponent,
    InputCheckboxComponent,
    SelectComponent,
    InputRangeComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DynamicFormService,
  ],
  exports: [DynamicFormComponent, DynamicFormTemplateDirective]
})
export class DynamicFormModule {
}
