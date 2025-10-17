import {Component} from '@angular/core';
import {TableComponent} from "../../../../shared/layouts/table/table.component";
import {TableActions, TableColumn} from "../../../../shared/layouts/table/interfaces/options-table.interface";
import {ClientService} from "../../service/client.service";
import {MatDialog} from "@angular/material/dialog";
import {ClientModalComponent} from "../../modals/client-modal/client-modal.component";
import {ClientModel} from "../../interface/client.model";
import {DeleteClientComponent} from "../../modals/delete-client/delete-client.component";

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
    edit: true,
    add: true,
    delete: true
  }

  columnsTable: TableColumn[] = [
    {name: 'Nombre', key: 'nombre', dataType: 'text'},
    {name: 'Estado', key: 'estado', dataType: 'boolean-to-status'},
    {name: 'Identificación', key: 'identificacion', dataType: 'number'},
    {name: 'Dirección', key: 'direccion', dataType: 'text'},
    {name: 'Teléfono', key: 'telefono', dataType: 'number'},
    {name: 'Género', key: 'genero', dataType: 'text'}
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

  deleteClient(clientId: number) {
    const matDialogRef = this._dialog.open(DeleteClientComponent, {
      width: '320px',
      autoFocus: false,
      data: clientId
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
        this.dataTable = data;
      }
    });
  }

}
