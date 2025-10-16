import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../../core/services/alert.service";
import {AccountService} from "../../service/accounts.service";

@Component({
  selector: 'app-client-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './account-modal.component.html',
  styleUrl: './account-modal.component.css'
})
export class AccountModalComponent implements OnInit {

  formAccount: FormGroup = new FormGroup({});

  isEdit: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<AccountModalComponent>,
    private _alert: AlertService,
    private _accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
    this.initFormAccount();
  }

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;
      this.setValueAccount(this.data);
    }
  }

  initFormAccount(): void {
    this.formAccount = new FormGroup({
      numAccount: new FormControl('', [Validators.required]),
      accountType: new FormControl('', [Validators.required]),
      InitialBalance: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]) 
    });
  }

  registerEditAccount() {

    const account: any = {
        numCuenta: this.formAccount.get('numAccount')?.value,
        tipoCuenta: this.formAccount.get('accountType')?.value,     
        saldoInicial: this.formAccount.get('InitialBalance')?.value,
        estado: this.formAccount.get('status')?.value       
    };

    this._accountService.addAccount(account).subscribe({
      next: (res) => {
        // this._alert.success('Cliente registrado con exito');
        // this._dialogRef.close(true);
      },
      error: (err) => {
        // this._alert.error('Error al registrar el cliente');
      }
    });
  }

  setValueAccount(data : any): void {
    this.formAccount.get("numAccount")?.setValue(data.numCuenta)
    this.formAccount.get("accountType")?.setValue(data.tipoCuenta)
    this.formAccount.get("InitialBalance")?.setValue(data.saldoInicial)
    this.formAccount.get("status")?.setValue(data.estado)
  }

  closeModal() {
    this._dialogRef.close(true);
  }

}
