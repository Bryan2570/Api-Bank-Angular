import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {EndPoints} from "../../../core/utils/end-points";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {MovementRequest} from "../interface/movements.request";
import {MovementResponse} from "../interface/movements.response";
import {Movement} from "../interface/movements.response";

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  constructor(private httpClient: HttpClient) {
  }

  private readonly API_URL = environment.api;

  public getAllMovement(): Observable<Movement[]> {
    return this.httpClient.get<Movement[]>(this.API_URL + EndPoints.MOVEMENT, {
      headers: {'ngrok-skip-browser-warning': 'true'}
    });
  }

  public addMovements(movement: MovementRequest): Observable<MovementResponse> {
    return this.httpClient.post<MovementResponse>(this.API_URL + EndPoints.POST_CREATE_MOVEMENT, movement);
  }

}
