/* eslint-disable no-restricted-syntax */
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormService {
  getControlClass(form: FormGroup, identifier: string) {
    const control = this.getFieldControl(form, identifier);
    if (!control?.touched) return '';
    if (control.errors) return 'error';
    return 'success';
  }

  public getFieldControl(form: FormGroup, controlName: string): AbstractControl {
    return form.get(controlName) || undefined;
  }


  hasError(form: FormGroup, controlIdentifier: string): boolean {
    const control = this.getFieldControl(form, controlIdentifier);
    control.setValue(control.value === 'null' ? null : control.value, { emitEvent: false });
    return !!(control?.errors && (control?.dirty || control?.touched));
  }

  getErrorMessages(form: FormGroup, controlIdentifier: string): string {
    const control = this.getFieldControl(form, controlIdentifier);


    const errors = control?.errors;
    const firstKey = Object.keys(errors || {})[0];

    const errorMessages: any = {
      required: 'El campo es requerido',
      minlength: `El campo debe tener mínimo ${errors?.minlength?.requiredLength}  ${errors?.maxlength?.requiredLength === '1' ? 'caracter' : 'caracteres'}`,
      maxlength: `El campo debe tener máximo ${errors?.maxlength?.requiredLength} ${errors?.maxlength?.requiredLength === '1' ? 'caracter' : 'caracteres'}`,
      max: `El campo debe ser máximo ${errors?.max?.max}`,
      min: `El campo debe ser mínimo ${errors?.min?.min}`,
      pattern: 'Los caracteres ingresados no son válidos para este campo'
    };

    return errorMessages[firstKey] || 'Campo inválido';
  }
}
