import {Component, Inject} from '@angular/core';
import {ClientService} from "../../service/client.service";
import {AlertService} from "../../../../core/services/alert.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-client',
  standalone: true,
  imports: [],
  templateUrl: './delete-client.component.html',
  styleUrl: './delete-client.component.css'
})
export class DeleteClientComponent {

  constructor(
    private _clientsService: ClientService,
    private _alert: AlertService,
    private _dialogRef: MatDialogRef<DeleteClientComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,
  ) {
  }

  closeConfirm(): void {
    this._dialogRef.close(true);
  }

  confirmDelete(): void {
    this._clientsService.deleteClient(this.id).subscribe({
      next: () => {
        this._alert.success('Cliente eliminado con éxito');
        this._dialogRef.close(true);
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
