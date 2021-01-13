import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

@Injectable()
export class DynamicFormService {
    public getTypeForm(control: FormGroup | AbstractControl): string {
        if (control instanceof FormGroup || control instanceof FormArray) {
            return control.constructor.name;
        } else {
            return 'FormControl';
        }
    }
}
