import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

export interface FieldConfig {
  disabled?: boolean;
  label?: string;
  name: string;
  options?: string[];
  placeholder?: string;
  type: string;
  validation?: ValidatorFn[];
  asyncValidation?: AsyncValidatorFn[];
  value?: any;
  errorMessage?: any;
}
