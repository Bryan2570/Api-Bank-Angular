import {Component, Inject} from '@angular/core';
import {AccountService} from "../../service/accounts.service";
import {AlertService} from "../../../../core/services/alert.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class DeleteAccountComponent {

  constructor(
    private _accountService: AccountService,
    private _alert: AlertService,
    private _dialogRef: MatDialogRef<DeleteAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,
  ) {
  }

  closeConfirm(): void {
    this._dialogRef.close(true);
  }

  confirmDelete(): void {
    this._accountService.deleteAccount(this.id).subscribe({
      next: () => {
        this._alert.success('Cuenta eliminada con éxito');
        this._dialogRef.close(true);
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
