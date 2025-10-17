import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../../core/services/alert.service";
import {ClientService} from "../../service/client.service";
import {ClientRequest} from "../../interface/client.request";
import {ClientModel} from "../../interface/client.model";

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
    @Inject(MAT_DIALOG_DATA) public data: ClientModel,
  ) {
    this.initFormClient();
  }

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;
      // this.setValueClient(this.data);
    }
  }

  initFormClient(): void {
    this.formClient = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      age: new FormControl(null, [Validators.required]),
      identification: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    });
  }

  registerEditClient() {
    const client = this.buildClient();

    if (this.isEdit) {
      this.updateClient(client);
    } else {
      this.addClient(client);
    }
  }

  private buildClient(): ClientRequest {

    const client: ClientRequest = {
      estado: this.formClient.get('status')?.value,
      contrasena : this.formClient.get('password')?.value,
      idPersonaNavigation: {
        nombre: this.formClient.get('name')?.value,
        genero: this.formClient.get('gender')?.value,
        edad: this.formClient.get('age')?.value,
        identificacion: this.formClient.get('identification')?.value,
        direccion: this.formClient.get('address')?.value,
        telefono: this.formClient.get('phone')?.value,
      }
    };

    return client;
  }

  private updateClient(client: ClientRequest): void {
    this._clientService.updateClient(this.data.idCliente, client).subscribe({
      next: () => {
        this._alert.success('Cliente actualizado con éxito');
        this._dialogRef.close(true);
      }
    });
  }

  private addClient(client: ClientRequest): void {
    this._clientService.addClient(client).subscribe({
      next: () => {
        this._alert.success('Cliente registrado con éxito');
        this._dialogRef.close(true);
      }
    });
  }

  // setValueClient(data: ClientModel) {
  //   this.formClient.get("name")?.setValue(data.nombre);
  //   this.formClient.get("gender")?.setValue(data.genero);
  //   this.formClient.get("age")?.setValue(data.edad);
  //   this.formClient.get("status")?.setValue(data.estado);
  //   this.formClient.get("identification")?.setValue(data.identificacion);
  //   this.formClient.get("address")?.setValue(data.direccion);
  //   this.formClient.get("phone")?.setValue(data.identificacion);
  // }

  closeModal() {
    this._dialogRef.close(true);
  }

}
