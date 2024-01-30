import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { LoginRequest } from "../models/login.models/login-request";
import { Observable } from "rxjs";
import { UserModel } from "../models/login.models/user-model";
import { TokenRequest } from "../models/login.models/token-request";
import { Status } from "../models/status";
import { StoreListModel } from "../models/store-list";
@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(
        private http: HttpClient
    ) { }
    LoginUrl = environment.apiUrl + 'Login'
    LogOutUrl = environment.apiUrl + 'Logout'
    GetStoreListUrl = environment.apiUrl + 'GetStoreList'
    Login(data: LoginRequest): Observable<UserModel> {
        return this.http.post<UserModel>(this.LoginUrl, data)
    }
    LogOut(data: TokenRequest): Observable<Status> {
        return this.http.post<Status>(this.LogOutUrl, data)
    }
    GetStoreList(): Observable<StoreListModel[]> {
        return this.http.get<StoreListModel[]>(this.GetStoreListUrl)
    }
}