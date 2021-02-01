import {Injectable, QueryList} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import { TTemplateList } from '../interfaces/dynamic-form.interface';
import {DynamicFormTemplateDirective} from './dynamic-form-template.directive';

@Injectable()
export class DynamicFormService {
  public sortControls(control: AbstractControl, array = []) {
    if (control instanceof FormGroup) {
      Object.keys(control.controls).forEach(key => {
        this.sortControls(control.controls[key], array);
      });
    } else if (control instanceof FormControl || control instanceof FormArray) {
      array.push(control);
      return;
    }
  }
  public updateTemplateList(
    defaultsTemplates: QueryList<DynamicFormTemplateDirective>,
    templateList: TTemplateList
  ): TTemplateList {
    defaultsTemplates.forEach((item) => {
      item.getType().forEach(type => !templateList[type] ? templateList[type] = item.template : null);
    });
    return templateList;
  }

  public createTemplateList(
    templates: QueryList<DynamicFormTemplateDirective>,
    templateList: TTemplateList
  ): TTemplateList {
    templates.forEach((item) => {
      item.getType().forEach(type => templateList[type] = item.template);
    });
    return templateList;
  }
}
