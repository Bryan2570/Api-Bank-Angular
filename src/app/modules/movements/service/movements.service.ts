import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {EndPoints} from "../../../core/utils/end-points";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Movimiento} from "../interface/movements.response";


@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  constructor(private httpClient: HttpClient) {
  }

  private readonly API_URL = environment.api;




public getAllMovement(): Observable<Movimiento[]> {
  console.log('URL Movements:', this.API_URL + EndPoints.MOVEMENT);
  return this.httpClient.get<Movimiento[]>(this.API_URL + EndPoints.MOVEMENT, {
    headers: { 'ngrok-skip-browser-warning': 'true' }
  });
}

  public addMovements(client: any): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + EndPoints.POST_CREATE_MOVEMENT, client);
  }

}
