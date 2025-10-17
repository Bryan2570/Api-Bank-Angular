import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AlertService} from "../../../../core/services/alert.service";
import {AccountService} from "../../service/accounts.service";
import {AccountRequest} from "../../interface/account.request";
import {AccountModel} from "../../interface/account.models";
import {ClientService} from "../../../clients/service/client.service";
import {ClientModel} from "../../../clients/interface/client.model";


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
  clients: ClientModel[] = [];

  isEdit: boolean = false;

  constructor(
    private _dialogRef: MatDialogRef<AccountModalComponent>,
    private _alert: AlertService,
    private _accountService: AccountService,
    private _clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: AccountModel,
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
      status: new FormControl(null, [Validators.required]),
      idClient: new FormControl('', [Validators.required])
    });
  }

    registerEditAccount() {
    const account = this.buildAccount();
    
      if (this.isEdit) {
        this.updateAccount(account);
      } else {
        this.addAccount(account);
      }
    }
  

        private buildAccount(): AccountRequest {
  
        const account: AccountRequest = {
        numCuenta: this.formAccount.get('numAccount')?.value,
        tipoCuenta : this.formAccount.get('accountType')?.value,     
        saldoInicial: this.formAccount.get('InitialBalance')?.value,
        estado: this.formAccount.get('status')?.value,        
        idCliente: this.formAccount.get('idClient')?.value,  
          };      
          return account;
        }


      private updateAccount(account: AccountRequest): void {
          this._accountService.updateAccount(this.data.idCliente, account).subscribe({
            next: () => {
              this._alert.success('Cliente actualizado con éxito');
              this._dialogRef.close(true);
            }
          });
        }

   private addAccount(account: AccountRequest): void {
    this._accountService.addAccount(account).subscribe({
      next: () => {
        this._alert.success('Cliente registrado con éxito');
        this._dialogRef.close(true);
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
