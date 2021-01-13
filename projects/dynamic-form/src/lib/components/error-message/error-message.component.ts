import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'error-message',
  template: `<small *ngIf="showError" style="color: red">field is required</small>`
})
export class ErrorMessageComponent implements OnInit {
  @Input() showError = false;
  constructor() { }

  ngOnInit(): void {
  }

}
