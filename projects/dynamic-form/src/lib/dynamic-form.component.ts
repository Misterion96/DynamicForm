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
import {AbstractControl, FormGroup} from '@angular/forms';
import {DynamicFormTemplateDirective} from './shared/dynamic-form-template.directive';
import {IFormChangeEvent} from './interfaces/dynamic-form.interface';
import {DynamicFormService} from './shared/dynamic-form.service';

@Component({
    selector: 'dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DynamicFormComponent implements OnInit, AfterViewInit {

    @Input()
    public submitButton = true;
    @Input()
    public formGroupList: FormGroup;
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

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this._createTemplateList();
        this._updateTemplateList();
        this.cdr.detectChanges();
    }

    constructor(private cdr: ChangeDetectorRef, private dynamicFormService: DynamicFormService) {
    }


    public getTypeForm(control: FormGroup | AbstractControl): string {
        return this.dynamicFormService.getTypeForm(control);
    }

    public submit(): void {
        this.onSubmitForm.emit(this.formGroupList.value);
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
