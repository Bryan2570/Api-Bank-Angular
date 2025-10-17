import {Component} from '@angular/core';
import {TableComponent} from "../../../../shared/layouts/table/table.component";
import {TableActions, TableColumn} from "../../../../shared/layouts/table/interfaces/options-table.interface";
import {MovementsService} from "../../service/movements.service";
import {Movement} from "../../interface/movements.response";
import {MatDialog} from "@angular/material/dialog";
import {MovementModalComponent} from "../../modals/movements-modal.component";

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [
    TableComponent
  ],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent {

  dataTable: Movement[] = [];

  tableAction: TableActions = {
    edit: true,
    add: true,
    delete: true
  }

  columnsTable: TableColumn[] = [
    {name: 'Fecha de Movimiento', key: 'fecha', dataType: 'text'},
    {name: 'Tipo de Movimiento', key: 'tipoMovimiento', dataType: 'text'},
    {name: 'Valor', key: 'valor', dataType: 'text'},
    {name: 'Saldo', key: 'saldo', dataType: 'text'}
  ];

  rowActionName: string = "";

  constructor(
    private _movementService: MovementsService,
    private _dialog: MatDialog,
  ) {
    this.tableAction.edit ? this.rowActionName = "Opciones" : "";
    this.getAllMovements();
  }

  addMovement() {
    const matDialogRef = this._dialog.open(MovementModalComponent, {
      width: '750px',
      autoFocus: false
    });
    matDialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) this.getAllMovements();
      }
    });
  }

  updateMovements(client: any) {

    const matDialogRef = this._dialog.open(MovementModalComponent, {
      width: '750px',
      autoFocus: false,
      data: client
    });
    matDialogRef.afterClosed().subscribe({
      next: (value) => {
        if (value) this.getAllMovements();
      }
    });
  }

    // deleteMovement(movementId: number) {
    //     const matDialogRef = this._dialog.open(DeleteAccountComponent, {
    //       width: '320px',
    //       autoFocus: false,
    //       data: movementId
    //     });
    //     matDialogRef.afterClosed().subscribe({
    //       next: (value) => {
    //         if (value) this.getAllAccounts();
    //       }
    //     });
    //   }


  getAllMovements() {
    this._movementService.getAllMovement().subscribe({
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
