import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {EndPoints} from "../../../core/utils/end-points";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Cuenta} from "../interface/accounts.response";
import {AccountRequest} from "../interface/account.request";
import { AccountResponse} from "../interface/accounts.response";
import {ClientRequest} from "../../clients/interface/client.request";
import { ClientResponse} from "../../clients/interface/clients.response";

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

  public addAccount(account: AccountRequest): Observable<AccountResponse> {
    console.log(account);
     return this.httpClient.post<AccountResponse>(this.API_URL + EndPoints.POST_CREATE_ACCOUNT, account);
   }


    public updateAccount(idAccount: number, account: AccountRequest): Observable<AccountResponse> {
      const url = `${this.API_URL}${EndPoints.PUT_UPDATE_ACCOUNT}${idAccount}`;
      return this.httpClient.put<AccountResponse>(url, account);
    }
  


}
