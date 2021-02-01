import {Component, OnInit} from '@angular/core';
import {DynamicFormArray, FormCheckBox, FormColor, FormDropDown, FormNumber, FormText} from 'es-dynamic-form';
import {FormRange} from '../../projects/dynamic-form/src/lib/classes/dynamic-form.classes';
import { FormGroup} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() {
  }

  private readonly cars = [
    {label: 'Audi', value: 'Audi'},
    {label: 'BMW', value: 'BMW'},
    {label: 'Fiat', value: 'Fiat'},
  ];
  title = 'es-dynamic-form';
  fg = new FormGroup({
    checkbox: new FormCheckBox({value: true, key: 'checkbox', label: 'my checkbox', order: 2}),
    text: new FormText({value: 'simple text', key: 'text', label: 'insert text'}),
    drop: new FormDropDown({
      value: this.cars[0].value, key: 'drop', label: 'cars list', order: -1,
      options: {items: this.cars},
    }),
    arrayNumber: new DynamicFormArray({
      value: [
        new FormNumber({value: -1, key: 0, label: 'number 1'}),
        new FormNumber({value: 2, key: 1, label: 'number 2'}),
        new FormNumber({value: 3, key: 2, label: 'number 3'}),
      ], key: 'arrayNumber', label: 'Числа', order: 111,
      options: {
        canAdd: true,
        control: FormNumber
      }
    }),
    color: new FormColor({value: '#fff222', key: 'color', label: 'colorpicker', disabled: false, order: 1}),
    range: new FormRange({
      value: 10, key: 'range', label: 'my range', order: 10,
      options: {min: 0, max: 100, showValue: true}
    })
  });

  ngOnInit(): void {
    console.log(this.fg);
  }
}
