import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../../core/services/alert.service";
import {ClientService} from "../../service/client.service";

@Component({
  selector: 'app-client-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './client-modal.component.html',
  styleUrl: './client-modal.component.css'
})
export class ClientModalComponent implements OnInit {

  formClient: FormGroup = new FormGroup({});

  isEdit: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<ClientModalComponent>,
    private _alert: AlertService,
    private _clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
    this.initFormClient();
  }

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;
      this.setValueClient(this.data);
    }
  }

  initFormClient(): void {
    this.formClient = new FormGroup({
      name: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      identification: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
    });
  }

  registerEditClient() {
    const client: any = {
      contrasena: this.formClient.get('password')?.value,
      estado: this.formClient.get('status')?.value,
      idPersonaNavigation: {
        nombre: this.formClient.get('name')?.value,
        genero: this.formClient.get('gender')?.value,
        edad: this.formClient.get('age')?.value,
        identificacion: this.formClient.get('identification')?.value,
        direccion: this.formClient.get('address')?.value,
        telefono: this.formClient.get('phone')?.value,        
      }
    };

    console.log('Objeto que se envía al backend:', client);

    this._clientService.addClient(client).subscribe({
      next: (res) => {
        this._alert.success('Cliente registrado con exito');
        this._dialogRef.close(true);
      },
      error: (err) => {
        this._alert.error('Error al registrar el cliente');
      }
    });

  }

  setValueClient(data : any): void {
    this.formClient.get("gender")?.setValue(data.genero)
    this.formClient.get("age")?.setValue(data.edad)
  }

  closeModal() {
    this._dialogRef.close(true);
  }

}
