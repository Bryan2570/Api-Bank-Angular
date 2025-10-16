import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../../app/core/services/alert.service";
import {MovementsService} from "../../movements/service/movements.service";

@Component({
  selector: 'app-client-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './movements-modal.component.html'//,
  //styleUrl: './movements-modal.component.css'
})
export class MovementModalComponent implements OnInit {

  formMovements: FormGroup = new FormGroup({});

  isEdit: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<MovementModalComponent>,
    private _alert: AlertService,
    private _movementService: MovementsService,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
    this.initFormMovement();
  }

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;
      this.setValueMovements(this.data);
    }
  }

  initFormMovement(): void {
    this.formMovements = new FormGroup({
      dateMovement: new FormControl('', [Validators.required]),
      typeMovement: new FormControl('', [Validators.required]),
      value: new FormControl(null, [Validators.required]),
      balance: new FormControl(null, [Validators.required]) 
    });
  }

  registerEditMovement() {

    const movement: any = {
        fecha: this.formMovements.get('dateMovement')?.value,
        tipoMovimiento: this.formMovements.get('typeMovement')?.value,     
        valor: this.formMovements.get('value')?.value,
        saldo: this.formMovements.get('balance')?.value       
    };

    this._movementService.getAllMovement().subscribe({
      next: (res) => {
        // this._alert.success('Cliente registrado con exito');
        // this._dialogRef.close(true);
      },
      error: (err) => {
        // this._alert.error('Error al registrar el cliente');
      }
    });
  }

  setValueMovements(data : any): void {
    this.formMovements.get("dateMovement")?.setValue(data.fecha)
    this.formMovements.get("typeMovement")?.setValue(data.tipoMovimiento)
    this.formMovements.get("value")?.setValue(data.valor)
    this.formMovements.get("balance")?.setValue(data.saldo)
  }

  closeModal() {
    this._dialogRef.close(true);
  }

}
