import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {EndPoints} from "../../../core/utils/end-points";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import { ClientResponse} from "../interface/clients.response";
import {ClientModel} from "../interface/client.model";
import {ClientRequest} from "../interface/client.request";

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

  public addClient(client: ClientRequest): Observable<ClientResponse> {
    return this.httpClient.post<ClientResponse>(this.API_URL + EndPoints.POST_CREATE_CLIENT, client);
  }

  public updateClient(idClient: number, client: ClientRequest): Observable<ClientResponse> {
    const url = `${this.API_URL}${EndPoints.PUT_UPDATE_CLIENT}${idClient}`;
    return this.httpClient.put<ClientResponse>(url, client);
  }

  public deleteClient(idClient: number): Observable<void> {
    const url = `${this.API_URL}${EndPoints.DELETE_CLIENT}${idClient}`;
    return this.httpClient.delete<void>(url);
  }

}
