import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {EndPoints} from "../../../core/utils/end-points";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Cuenta} from "../interface/accounts.response";


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) {
  }

  private readonly API_URL = environment.api;

public getAllAccounts(): Observable<Cuenta[]> {
    console.log('URLCuenta:', this.API_URL + EndPoints.ACCOUNT);
  return this.httpClient.get<Cuenta[]>(this.API_URL + EndPoints.ACCOUNT, {
    headers: { 'ngrok-skip-browser-warning': 'true' }
  });
}

  public addAccount(client: any): Observable<any> {
    return this.httpClient.post<any>(this.API_URL + EndPoints.POST_CREATE_CLIENT, client);
  }

}
