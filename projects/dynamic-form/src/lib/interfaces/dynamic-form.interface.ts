export type TDynamicFormTemplate = 'checkbox' | 'number' | 'text' | 'dropdown' | 'color'
export interface IFormChangeEvent {
    type: string;
    key: string | number;
    value: any
}
export interface IFormStateControl<T, U> {
    value: T,
    key: string | number,
    label: string | number,
    disabled?: boolean,
    options?: U
}
export type FormHooks = 'change'|'blur'|'submit';
export interface ISelectItem {
    label?: string;
    value: any;
    styleClass?: string;
    icon?: string;
    title?: string;
    disabled?: boolean;
}
