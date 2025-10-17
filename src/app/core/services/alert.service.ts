import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {}

  public success(message: string): void {
    this.showToast('success', 'Éxito', message);
  }

  public info(message: string): void {
    this.showToast('info', 'Información', message);
  }

  public warning(message: string): void {
    this.showToast('warning', 'Advertencia', message);
  }

  public error(message: string, modal: boolean = false): void {
    if (modal) {
      this.showModal('error', 'Error', message);
    } else {
      this.showToast('error', 'Error', message);
    }
  }

  private showToast(icon: SweetAlertIcon, title: string, message: string): void {
    Swal.fire({
      icon,
      title,
      text: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      background: '#fff',
      color: '#111827',
      customClass: {
        popup: 'shadow-lg rounded-md border border-gray-200'
      }
    });
  }

  private showModal(icon: SweetAlertIcon, title: string, message: string): void {
    Swal.fire({
      icon,
      title,
      text: message,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#2563eb',
      background: '#fff',
      color: '#111827',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  }
}
