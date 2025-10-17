import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {EndPoints} from "../../../core/utils/end-points";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private readonly API_URL = environment.api;

  constructor(private httpClient: HttpClient) {
  }


  public generateReportPDF(id: number, dateIni: Date, dateEnd: Date): Observable<any> {
    const url = `${this.API_URL}${EndPoints.REPORTS_GENERATE_PDF}`;

    const params = new HttpParams()
      .set('id', id)
      .set('fechaInicio', dateIni.toISOString().split('T')[0])
      .set('fechaFin', dateEnd.toISOString().split('T')[0]);

    return this.httpClient.get(url, {
      params,
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
  }


}
