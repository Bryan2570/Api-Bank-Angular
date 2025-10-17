import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NgForOf} from "@angular/common";
import {AccountService} from "../../accounts/service/accounts.service";
import {AlertService} from "../../../core/services/alert.service";
import {MovementsService} from "../service/movements.service";
import {MovementRequest} from "../interface/movements.request";

@Component({
  selector: 'app-movement-modal',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NgForOf
    ],
  templateUrl: './movements-modal.component.html',
  styleUrl: './movements-model.component.css'
})
export class MovementModalComponent implements OnInit {

  formMovements: FormGroup = new FormGroup({});
  accounts: any[] = [];

  isEdit: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<MovementModalComponent>,
    private _alert: AlertService,
    private _accountsService: AccountService,
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
    this.loadClients();
  }

  loadClients(): void {
    this._accountsService.getAllAccounts().subscribe({
      next: (accounts) => this.accounts = accounts,
      error: () => this._alert.error('Error al cargar la lista de clientes.')
    });
  }

  initFormMovement(): void {
    this.formMovements = new FormGroup({
      account: new FormControl('', [Validators.required]),
      typeMovement: new FormControl('', [Validators.required]),
      value: new FormControl(null, [Validators.required])
    });
  }

  registerEditMovement() {

    const movement: MovementRequest = {
        tipoMovimiento: this.formMovements.get('typeMovement')?.value,
        valor: this.formMovements.get('value')?.value,
        idCuenta: this.formMovements.get('account')?.value
    };

    this._movementService.addMovements(movement).subscribe({
      next: () => {
        this._alert.success('Movimiento registrado con éxito.');
        this.closeModal();
      },
      error: () => this._alert.error('Error al registrar el movimiento.')
    });

  }

  setValueMovements(data : any): void {
    this.formMovements.get("typeMovement")?.setValue(data.tipoMovimiento);
    this.formMovements.get("value")?.setValue(data.valor);
    this.formMovements.get("balance")?.setValue(data.saldo);
  }

  closeModal() {
    this._dialogRef.close(true);
  }

}
