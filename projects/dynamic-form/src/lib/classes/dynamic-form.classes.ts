import {AbstractControlOptions, AsyncValidatorFn, FormControl, ValidatorFn, FormGroup, AbstractControl, FormArray} from '@angular/forms';
import {ISelectItem, IFormStateControl} from '../interfaces/dynamic-form.interface';

export abstract class Question extends FormControl {
  public required = false;
  public controlType;
  public order: number;
  public key: string | number = '';
  public label: string | number = '';
  public options;

  protected constructor(
    formState: IFormStateControl<string | number | boolean, any>,
    validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(formState.value, validatorOrOpts, asyncValidator);

    this.applySettings(formState);
    this.updateEnable(formState.disabled);
    this.order = formState.order ?? 0;
    this.options = formState.options;
    this.required = !!validatorOrOpts && !!asyncValidator;
  }

  get id(): string {
    return `${this.controlType}-${this.key}`;
  }

  get style(): string {
    return `form-control-${this.controlType}`;
  }

  private applySettings(formState: IFormStateControl<any, any>): void {
    const {key, label} = formState;
    this.key = key;
    this.label = label;
  }

  private updateEnable(event: boolean): void {
    if (event) {
      this.disable();
    } else {
      this.enable();
    }
  }
}

export class FormCheckBox extends Question {
  public readonly controlType = 'checkbox';

  constructor(
    formState: IFormStateControl<boolean, any> = {
      value: false,
      key: 'checkbox',
      label: 'checkbox',
      disabled: false,
      order: 1
    },
    validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(formState, validatorOrOpts, asyncValidator);

  }
}

export class FormText extends Question {
  public readonly controlType = 'text';

  constructor(
    formState: IFormStateControl<string, any> = {
      value: 'text',
      key: 'text',
      label: 'text',
      disabled: false,
      order: 1
    },
    validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(formState, validatorOrOpts, asyncValidator);
  }
}

export class FormNumber extends Question {
  public readonly controlType = 'number';

  constructor(
    formState: IFormStateControl<number, any> = {
      value: 0,
      key: 'number',
      label: 'number',
      disabled: false,
      order: 1
    },
    validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(formState, validatorOrOpts, asyncValidator);
  }
}

export class FormDropDown extends Question {
  public readonly controlType = 'dropdown';
  public items: ISelectItem[];

  constructor(
    formState: IFormStateControl<string | number, { items: ISelectItem[] }> = {
      value: null,
      key: 'dropdown',
      label: 'dropdown',
      disabled: false,
      order: 1,
      options: {
        items: []
      }
    },
    validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(formState, validatorOrOpts, asyncValidator);
    this.items = formState.options.items;
  }
}

export class FormColor extends Question {
  public readonly controlType = 'color';

  constructor(
    formState: IFormStateControl<string, any> = {
      value: '#fff000',
      key: 'color',
      label: 'color',
      disabled: false,
      order: 1
    },
    validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(formState, validatorOrOpts, asyncValidator);
  }
}

export class FormRange extends Question {
  public readonly controlType = 'range';

  constructor(
    formState: IFormStateControl<number, {
      min: number,
      max: number,
      showValue?: boolean
    }> = {
      value: 0,
      key: 'range',
      label: 'range',
      disabled: false,
      order: 1,
      options: {
        max: 100,
        min: 0
      }
    },
    validatorOrOpts?: ValidatorFn | AbstractControlOptions | ValidatorFn[],
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[],
  ) {
    super(formState, validatorOrOpts, asyncValidator);
  }
}

export class DynamicFormArray extends FormArray {
  public readonly controlType = 'array';
  public key: 'array';
  public label: 'array';
  public order: 1;
  public options: {
    canAdd: false,
    control: Function
  };

  constructor(
    array: IFormStateControl<AbstractControl[], {
      canAdd: boolean,
      control: Function
    }> = {
      value: [],
      key: 'array',
      label: 'array',
      order: 1,
      options: {
        canAdd: false,
        control: Function
      }
    },
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(array.value, validatorOrOpts, asyncValidator);
    Object.assign(this, array);
  }

  get style(): string {
    return `form-array`;
  }

  get id(): string {
    return `${this.controlType}-${this.key}`;
  }
}

// @Injectable()
// export class DynamicFormBuilder {
//   private readonly controlFactory = new FormControlFactory();
//
//   /**
//    * Constructs a new `FormArray` from the given array of configurations,
//    * validators and options.
//    *
//    * @param controlsConfig An array of child controls or control configs. Each
//    * child control is given an index when it is registered.
//    *
//    * @param validatorOrOpts A synchronous validator function, or an array of
//    * such functions, or an `AbstractControlOptions` object that contains
//    * validation functions and a validation trigger.
//    *
//    * @param asyncValidator A single async validator or array of async validator
//    * functions.
//    */
//   public array(
//     controlsConfig: any[],
//     validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
//     asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null): FormArray {
//     const controls = controlsConfig.map(c => this._createControl(c));
//     return new FormArray(controls, validatorOrOpts, asyncValidator);
//   }
//
//   /**
//    * @description
//    * Construct a new `FormControl` with the given state, validators and options.
//    *
//    * @param formsState - value of future control
//    * @param type of the FormControl to create
//    * @param valid - sync ValidatorFn
//    * @param asValid
//    * such functions, or an `AbstractControlOptions` object that contains
//    * validation functions and a validation trigger.
//    *
//    * functions.
//    */
//   public control(
//     formsState: IFormStateControl<any, any>,
//     type: TDynamicFormTemplate,
//     valid?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
//     asValid?: AsyncValidatorFn | AsyncValidatorFn[] | null
//   ): FormControl {
//     return this.controlFactory.create(formsState, type, valid, asValid);
//   }
//
//   /**
//    * @description
//    * Construct a new `FormGroup` instance.
//    *
//    * @param controlsConfig A collection of child controls. The key for each child is the name
//    * under which it is registered.
//    *
//    * @param options Configuration options object for the `FormGroup`. The legacy configuration
//    * object consists of:
//    * * `validator`: A synchronous validator function, or an array of validator functions
//    * * `asyncValidator`: A single async validator or array of async validator functions
//    * Note: the legacy format is deprecated and might be removed in one of the next major versions
//    * of Angular.
//    */
//
//   public group(
//     controlsConfig: { [key: string]: FormArray | [IFormStateControl<unknown, unknown>, string, any] },
//     options: AbstractControlOptions | { [key: string]: any } | null = null): FormGroup {
//     const controls = this._reduceControls(controlsConfig);
//
//     let validators: ValidatorFn | ValidatorFn[] | null = null;
//     let asyncValidators: AsyncValidatorFn | AsyncValidatorFn[] | null = null;
//     let updateOn: FormHooks | undefined;
//
//     if (options != null) {
//       if (isAbstractControlOptions(options)) {
//         // `options` are `AbstractControlOptions`
//         validators = options.validators != null ? options.validators : null;
//         asyncValidators = options.asyncValidators != null ? options.asyncValidators : null;
//         updateOn = options.updateOn != null ? options.updateOn : undefined;
//       } else {
//         // `options` are legacy form group options
//         validators = options.validator != null ? options.validator : null;
//         asyncValidators = options.asyncValidator != null ? options.asyncValidator : null;
//       }
//     }
//
//     return new FormGroup(controls, {asyncValidators, updateOn, validators});
//   }
//
//   /** @internal */
//   private _reduceControls(controlsConfig: { [k: string]: any }): { [key: string]: AbstractControl } {
//     const controls: { [key: string]: AbstractControl } = {};
//     Object.keys(controlsConfig).forEach(controlName => {
//       controls[controlName] = this._createControl(controlsConfig[controlName]);
//     });
//     return controls;
//   }
//
//   /** @internal */
//   private _createControl(
//     controlConfig:
//       FormControl | FormGroup | FormArray |
//       [IFormStateControl<unknown, unknown>, TDynamicFormTemplate, ValidatorFn?, AsyncValidatorFn?]
//   ): AbstractControl {
//     if (controlConfig instanceof FormControl || controlConfig instanceof FormGroup ||
//       controlConfig instanceof FormArray) {
//       return controlConfig;
//     } else if (Array.isArray(controlConfig)) {
//       const value = controlConfig[0];
//       const type = controlConfig[1] ?? 'text';
//       const validator: ValidatorFn = controlConfig.length > 2 ? controlConfig[2] : null;
//       const asyncValidator: AsyncValidatorFn = controlConfig.length > 3 ? controlConfig[3] : null;
//       return this.control(value, type, validator, asyncValidator);
//
//     } else {
//       throw new Error('unresolved call');
//     }
//   }
//
// }
//
// function isAbstractControlOptions(options: AbstractControlOptions |
//   { [key: string]: any }): options is AbstractControlOptions {
//   return (options as AbstractControlOptions).asyncValidators !== undefined ||
//     (options as AbstractControlOptions).validators !== undefined ||
//     (options as AbstractControlOptions).updateOn !== undefined;
// }
//
// class FormControlFactory {
//   private readonly formControlList = {
//     checkbox: FormCheckBox,
//     color: FormColor,
//     dropdown: FormDropDown,
//     number: FormNumber,
//     text: FormText,
//     range: FormRange
//   };
//
//   public create(formsState: IFormStateControl<any, any>,
//                 type: TDynamicFormTemplate,
//                 valid?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
//                 asValid?: AsyncValidatorFn | AsyncValidatorFn[] | null)
//     : Question {
//     const Control = this.formControlList[type] || this.formControlList.text;
//     return new Control(formsState as any, valid, asValid);
//
//   }
// }
