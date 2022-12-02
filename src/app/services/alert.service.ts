/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {
  constructor() { }

  error(title: string, text: string) {
    Swal.fire({ title, text, icon: 'error' }).then((_result: any) => {

    });
  }


  async warning(title: string, message: string) {
    const alert = await Swal.fire({
      title,
      text: message,
      icon: 'warning',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'cox-btn cox-btn--primary',
        cancelButton: 'btn btn-secondary'
      },
      showCancelButton: false,
      confirmButtonText: 'Aceptar'
    });

    return alert.value && alert.dismiss !== Swal.DismissReason.cancel;
  }


  notify(message: string, timer = 3000) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'cox-btn cox-btn--primary',
        cancelButton: 'btn btn-secondary'
      },
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'success',
      title: message
    });
  }


  notifyError(message: string, timer = 3000) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'cox-btn cox-btn--primary',
        cancelButton: 'btn btn-secondary'
      },
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'error',
      title: message
    });
  }


  notifyWarning(message: string, timer = 3000) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'cox-btn cox-btn--primary',
        cancelButton: 'btn btn-secondary'
      },
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    Toast.fire({
      icon: 'warning',
      title: message
    });
  }


  success(message = 'Operación completada satisfactoriamente') {
    const swalWithBootstrapButtons = Swal.mixin({});
    swalWithBootstrapButtons.fire('Éxito!', message, 'success');
  }

  cancel(message = 'Operación Cancelada') {
    Swal.fire('Cancelled', message, 'error');
  }

  async confirm(title: string, message: string, options: any = {}) {
    const alert = await Swal.fire({
      title,
      text: message,
      icon: 'question',
      buttonsStyling: false,
      customClass: {
        confirmButton: 'cox-btn cox-btn--primary mr-2',
        cancelButton: 'cox-btn cox-btn--secondary'
      },
      showCancelButton: true,
      confirmButtonText: options.confirm || 'Aceptar',
      cancelButtonText: options.cancel || 'Cancelar'
    });

    return alert.value && alert.dismiss !== Swal.DismissReason.cancel;
  }
}
