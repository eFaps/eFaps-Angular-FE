import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  validations: ValidateFn[] = [];

  constructor() {}

  isValid(values: Map<String, any> | undefined): boolean {
    let valid = true;
    if (values != undefined) {
      this.validations.forEach((validation) => {
        valid = valid && validation(values);
      });
    }
    return valid;
  }

  registerValidation(validateFn: ValidateFn) {
    this.validations.push(validateFn);
  }

  reset() {
    this.validations = [];
  }
}

export interface ValidateFn {
  (values: Map<String, any>): boolean;
}
