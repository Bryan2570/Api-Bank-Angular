import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ClientModel} from "../../../clients/interface/client.model";
import {ReportsService} from "../../services/reports.service";
import {ClientService} from "../../../clients/service/client.service";
import {AlertService} from "../../../../core/services/alert.service";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  formReport: FormGroup = new FormGroup({});
  clients: ClientModel[] = [];

  constructor(
    private _reportService: ReportsService,
    private _clientService: ClientService,
    private _alert: AlertService
  ) {}

  ngOnInit(): void {
    this.initFormReport();
    this.loadClients();
  }

  initFormReport(): void {
    this.formReport = new FormGroup({
      cliente: new FormControl('', Validators.required),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
    });
  }

  loadClients(): void {
    this._clientService.getAllClients().subscribe({
      next: (clients) => this.clients = clients,
      error: () => this._alert.error('Error al cargar la lista de clientes.')
    });
  }

  generateReportPDF(): void {
    if (this.formReport.invalid) {
      this.formReport.markAllAsTouched();
      this._alert.warning('Por favor complete todos los campos.');
      return;
    }

    const { cliente, fechaInicio, fechaFin } = this.formReport.value;

    this._reportService.generateReportPDF(cliente, new Date(fechaInicio), new Date(fechaFin))
      .subscribe({
        next: (response) => {
          const base64PDF = response.pdfBase64;
          if (!base64PDF) {
            this._alert.warning('No se recibió el PDF del servidor.');
            return;
          }
          const byteCharacters = atob(base64PDF);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `reporte_cliente_${cliente}_${fechaInicio}_${fechaFin}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);

          this._alert.success('Reporte generado correctamente.');
        },
        error: (err) => {
          console.error('Error al generar reporte', err);
          this._alert.error('Error al generar el reporte.');
        }
      });
  }
}
