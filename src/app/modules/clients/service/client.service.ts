import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {EndPoints} from "../../../core/utils/end-points";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ClientModel, ClientResponse} from "../interface/clients.response";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient: HttpClient) {
  }

  private readonly API_URL = environment.api;

  public getAllClients(): Observable<ClientModel[]> {
    return this.httpClient.get<ClientResponse>(this.API_URL + EndPoints.CLIENT, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    }).pipe(
      map(clients => clients.map(client => {
        const { idPersonaNavigation, ...rest } = client;
        return {
          ...rest,
          ...idPersonaNavigation
        };
      }))
    );
  }

  public addClient(client: any): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + EndPoints.POST_CREATE_CLIENT, client);
  }

}
