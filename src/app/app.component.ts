import {Component, OnInit} from '@angular/core';
import {DynamicFormBuilder} from 'es-dynamic-form';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private fb: DynamicFormBuilder) {
  }

  private readonly cars = [
    {label: 'Audi', value: 'Audi'},
    {label: 'BMW', value: 'BMW'},
    {label: 'Fiat', value: 'Fiat'},
  ];
  title = 'es-dynamic-form';
  fg = this.fb.group({
    checkbox: [{value: true, key: 'checkbox', label: 'my checkbox'}, 'checkbox'],
    text: [{value: 'simple text', key: 'text', label: 'insert text'}, 'text'],
    drop: [{
      value: this.cars[0].value, key: 'drop', label: 'cars list',
      options: {items: this.cars}
    }, 'dropdown'],
    arrayNumber: this.fb.array([
      [{value: -1, key: 0, label: 'number 1'}, 'number', Validators.min(0)],
      [{value: 2, key: 1, label: 'number 2'}, 'number', Validators.min(0)],
      [{value: 3, key: 2, label: 'number 3'}, 'number', Validators.min(0)],
    ]),
    color: [{value: '#fff222', key: 'color', label: 'colorpicker', disabled: false}, 'color'],
  });

  ngOnInit(): void {
    console.log(this.fg);
  }
}
