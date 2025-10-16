import {Component} from '@angular/core';
import {TableComponent} from "../../../../shared/layouts/table/table.component";
import {TableActions, TableColumn} from "../../../../shared/layouts/table/interfaces/options-table.interface";
import {ClientService} from "../../service/client.service";
import {ClientModel} from "../../interface/clients.response";
import {MatDialog} from "@angular/material/dialog";
import {ClientModalComponent} from "../../modals/client-modal/client-modal.component";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    TableComponent
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

  dataTable: ClientModel[] = [];

  tableAction: TableActions = {
    addByDocument: false,
    edit: true,
    add: true,
  }

  columnsTable: TableColumn[] = [
    {name: 'Nombre', key: 'nombre', dataType: 'text'},
    {name: 'Estado', key: 'estado', dataType: 'text'},
    {name: 'Identificacion', key: 'identificacion', dataType: 'text'},
    {name: 'Direccion', key: 'direccion', dataType: 'text'},
    {name: 'Telefono', key: 'telefono', dataType: 'text'},
    {name: 'Genero', key: 'genero', dataType: 'text'}
  ];

  rowActionName: string = "";

  constructor(
    private _clientsService: ClientService,
    private _dialog: MatDialog,
  ) {
    this.tableAction.edit ? this.rowActionName = "Opciones" : "";
    this.getAllClients();
  }

  addClient() {
    const matDialogRef = this._dialog.open(ClientModalComponent, {
      width: '750px',
      autoFocus: false
    });
    matDialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) this.getAllClients();
      }
    });
  }

  updateClient(client: any) {

    const matDialogRef = this._dialog.open(ClientModalComponent, {
      width: '750px',
      autoFocus: false,
      data: client
    });
    matDialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) this.getAllClients();
      }
    });

  }

  getAllClients() {
    this._clientsService.getAllClients().subscribe({
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
