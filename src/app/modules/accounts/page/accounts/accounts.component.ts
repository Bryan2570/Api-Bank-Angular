import {Component} from '@angular/core';
import {TableComponent} from "../../../../shared/layouts/table/table.component";
import {TableActions, TableColumn} from "../../../../shared/layouts/table/interfaces/options-table.interface";
import {AccountService} from "../../service/accounts.service";
import {Cuenta} from "../../interface/accounts.response";
import {MatDialog} from "@angular/material/dialog";
import {AccountModalComponent} from "../../modals/account-modal/account-modal.component";
import {DeleteAccountComponent} from "../../modals/delete-account/delete-account.component";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    TableComponent
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {

  dataTable: Cuenta[] = [];

  tableAction: TableActions = {
    edit: true,
    add: true,
    delete: true
  }

  columnsTable: TableColumn[] = [
    {name: 'Numero Cuenta', key: 'numCuenta', dataType: 'number'},
    {name: 'Tipo de Cuenta', key: 'tipoCuenta', dataType: 'text'},
    {name: 'Saldo Inicial', key: 'saldoInicial', dataType: 'currency'},
    {name: 'Estado', key: 'estado', dataType: 'boolean-to-status'}
  ];

  rowActionName: string = "";

  constructor(
    private _accountService: AccountService,
    private _dialog: MatDialog,
  ) {
    this.tableAction.edit ? this.rowActionName = "Opciones" : "";
    this.getAllAccounts();
  }

  addAccount() {
    const matDialogRef = this._dialog.open(AccountModalComponent, {
      width: '750px',
      autoFocus: false
    });
    matDialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) this.getAllAccounts();
      }
    });
  }

  updateAccount(account: any) {

    const matDialogRef = this._dialog.open(AccountModalComponent, {
      width: '750px',
      autoFocus: false,
      data: account
    });
    matDialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) this.getAllAccounts();
      }
    });
  }

  deleteAccount(clientId: number) {
    const matDialogRef = this._dialog.open(DeleteAccountComponent, {
      width: '320px',
      autoFocus: false,
      data: clientId
    });
    matDialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) this.getAllAccounts();
      }
    });
  }

  getAllAccounts() {
    this._accountService.getAllAccounts().subscribe({
      next: data => {
        console.log(data)
        this.dataTable = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
