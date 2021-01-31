import {
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
    TemplateRef,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {DynamicFormTemplateDirective} from './shared/dynamic-form-template.directive';
import {IFormChangeEvent} from './interfaces/dynamic-form.interface';
import {DynamicFormService} from './shared/dynamic-form.service';
import { Question } from './classes/dynamic-form.classes';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicFormComponent implements OnInit, AfterViewInit {
    public formGroupList
    public list: Question[] = []
    @Input()
    public submitButton = true;
    @Input()
    public styleClass = 'dynamic-form';
    @Input()
    public submitName = 'Submit';
    @Input()
    public debug = false;
    @Output()
    readonly onSubmitForm: EventEmitter<FormGroup['value']> = new EventEmitter<FormGroup['value']>();
    @Output()
    readonly onChangeForm: EventEmitter<IFormChangeEvent> = new EventEmitter<IFormChangeEvent>();
    public templateList: { [p: string]: TemplateRef<DynamicFormTemplateDirective> } = {};
    @ContentChildren(DynamicFormTemplateDirective)
    protected templates: QueryList<DynamicFormTemplateDirective>;
    @ViewChildren(DynamicFormTemplateDirective)
    protected defaultsTemplates: QueryList<DynamicFormTemplateDirective>;

    constructor(private cdr: ChangeDetectorRef, private dynamicFormService: DynamicFormService) {
    }

    @Input() set FormGroupList(v: FormGroup){
      if(v){
        this.formGroupList = v
        this.pushControl(v)
      }
    };

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this._createTemplateList();
        this._updateTemplateList();
        this.cdr.detectChanges();
    }

    public getTypeForm(control: FormGroup | AbstractControl): string {
        return this.dynamicFormService.getTypeForm(control);
    }

    public submit(): void {
        this.onSubmitForm.emit(this.formGroupList.value);
    }

    private sortControls(v: AbstractControl, array = []){
      if(v instanceof FormGroup){
        Object.keys(v.controls).forEach(key => {
          this.sortControls(v.controls[key], array)
        })
      }else if(v instanceof FormArray){
        v.controls.forEach(control => this.sortControls(control, array))

      }else if(v instanceof FormControl){
        array.push(v)
        return
      }
    }

    private pushControl(v: FormGroup | FormArray | Question){
      const array: Question[] = []
      this.sortControls(v, array)
      this.list = array.sort((a,b) => a.order - b.order)
    }

    private _createTemplateList(): void {
        this.defaultsTemplates.forEach((item) => {
            item.getType().forEach(type => {
                this.templateList[type] = item.template;
            });
        });
    }

    private _updateTemplateList(): void {
        this.templates.forEach((item) => {
            item.getType().forEach(type => {
                if (this.templateList[type]) {
                    this.templateList[type] = item.template;
                } else {
                    console.error(`template под именем "${type}" не существует \n Текущий список templates ${Object.keys(this.templateList)}`);
                }
            });
        });
    }

}
