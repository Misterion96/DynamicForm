import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { FormArray, FormGroup} from '@angular/forms';
import {DynamicFormTemplateDirective} from './shared/dynamic-form-template.directive';
import {IFormChangeEvent, TTemplateList} from './interfaces/dynamic-form.interface';
import {DynamicFormService} from './shared/dynamic-form.service';
import {DynamicFormArray, Question} from './classes/dynamic-form.classes';



@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DynamicFormComponent implements OnInit, AfterViewInit, AfterContentInit {
  public formGroup: FormGroup;
  public controlsList: Question[] = [];

  @Input() public submitButton = true;
  @Input() public styleClass = 'dynamic-form';
  @Input() public submitName = 'Submit';
  @Input() public debug = false;
  @Output() readonly onSubmitForm: EventEmitter<FormGroup['value']> = new EventEmitter<FormGroup['value']>();
  @Output() readonly onChangeForm: EventEmitter<IFormChangeEvent> = new EventEmitter<IFormChangeEvent>();

  public templateList: TTemplateList = {};
  @ContentChildren(DynamicFormTemplateDirective)
  protected templates: QueryList<DynamicFormTemplateDirective>;
  @ViewChildren(DynamicFormTemplateDirective)
  protected defaultsTemplates: QueryList<DynamicFormTemplateDirective>;

  constructor(private cdr: ChangeDetectorRef, private dynFormService: DynamicFormService) {
  }

  @Input() set FormGroupList(formGroup: FormGroup) {
    if (formGroup) {
      this.formGroup = formGroup;
      this.createControlList(formGroup);
    }
  };

  ngOnInit(): void {

  }

  ngAfterContentInit() {
    this.templateList = this.dynFormService.createTemplateList(this.templates, this.templateList);
  }

  ngAfterViewInit(): void {
    this.templateList = this.dynFormService.updateTemplateList(this.defaultsTemplates, this.templateList);
    this.cdr.detectChanges();
  }

  public submit(): void {
    this.onSubmitForm.emit(this.formGroup.value);
  }

  private createControlList(v: FormGroup | FormArray | Question) {
    const array: Question[] = [];
    this.dynFormService.sortControls(v, array);
    this.controlsList = array.sort((a, b) => a.order - b.order);
  }

  pushControl(Control, array: DynamicFormArray) {
    const control = new Control()
    control.key = array.controls.length
    array.push(control)
  }
}
