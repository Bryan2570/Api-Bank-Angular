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
    edit: false,
    add: true,
    delete: false
  }

  columnsTable: TableColumn[] = [
    {name: 'Fecha de Movimiento', key: 'fecha', dataType: 'text'},
    {name: 'Tipo de Movimiento', key: 'tipoMovimiento', dataType: 'text'},
    {name: 'Valor', key: 'valor', dataType: 'currency'},
    {name: 'Saldo', key: 'saldo', dataType: 'currency'}
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

  getAllMovements() {
    this._movementService.getAllMovement().subscribe({
      next: data => {
        this.dataTable = data;
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
