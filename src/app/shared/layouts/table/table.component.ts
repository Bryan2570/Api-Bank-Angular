import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {
  TableActions,
  TableColumn,
  TypeTable
} from "./interfaces/options-table.interface";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {GetterPropertyPipe} from "../../../core/pipes/getter-property.pipe";
import {DataTypeTablePipe} from "../../../core/pipes/data-type-table.pipe";
import {CustomCurrencyPipe} from "../../../core/pipes/custom-currency.pipe";
import {MatPaginator} from "@angular/material/paginator";
import { ReactiveFormsModule } from "@angular/forms";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

const TABLE_ACTIONS: TableActions = {
  add: false,
  edit: false,
  addByDocument: false,
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatNoDataRow,
    MatTable,
    MatSort,
    MatHeaderCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatSortHeader,
    MatCell,
    MatCellDef,
    GetterPropertyPipe,
    DataTypeTablePipe,
    MatPaginator,
    ReactiveFormsModule,
    MatProgressSpinner,
  ],
  providers: [CustomCurrencyPipe, DatePipe],
})
export class TableComponent implements OnInit {
  // ====== DATA TABLE ====== \\
  @Input() titleTable: string = 'titulo';
  tableDataSource = new MatTableDataSource<any>([]);

  // ====== COLUMNS ====== \\
  displayedColumns: string[] = [];
  @ViewChild(MatPaginator, {static: false}) matPaginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) matSort!: MatSort;

  // ====== ACTIONS ====== \\\
  @Input() actions: TableActions = TABLE_ACTIONS;
  @Input() rowActionName: string = 'Opciones';
  @Input() addActionName: string = 'Nuevo registro'
  @Input() totalElements: number = 0;
  @Input() tableColumns: TableColumn[] = [];
  @Input() typeTable: TypeTable = '';

  // ====== EVENTOS ====== \\
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() addExport: EventEmitter<any> = new EventEmitter<any>();
  @Output() return: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  ngOnInit(): void {
    const columnNames = this.tableColumns.map((tableColumn: TableColumn) => tableColumn.name);
    if (this.rowActionName) {
      this.displayedColumns = [...columnNames, this.rowActionName]
    } else {
      this.displayedColumns = columnNames;
    }
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource(data);
  }

  // ====== OPCIONES TABLA ====== \\
  addItem(): void {
    this.add.emit();
  }

  editItem(value: string): void {
    this.edit.emit(value);
  }
  

  exportFile(): void {
    this.addExport.emit();
  }

}
