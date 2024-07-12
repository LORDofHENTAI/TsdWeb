import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { CookieLogin } from "src/app/models/login.models/cookie-login";
import { LoginRequest } from "src/app/models/login.models/login-request";
import { StoreListModel } from "src/app/models/store-list";
import { LoginService } from "src/app/services/login.service";
import { TokenService } from "src/app/services/token.service";
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
        private loginService: LoginService,
        private tokenService: TokenService,
        private router: Router
    ) { }

    storeList: StoreListModel[]
    selectedStore: number
    login: string
    ngOnInit(): void {
        this.GetStoreList()
        if (this.tokenService.getToken() != "") {
            this.router.navigate(['/'])
        }
    }

    GetStoreList() {
        this.loginService.GetStoreList().subscribe({
            next: result => {
                this.storeList = result
            },
            error: error => {
                console.log(error)
            }
        })
    }

    Login() {
        this.loginService.Login(new LoginRequest(this.login, this.selectedStore)).subscribe({
            next: result => {
                this.tokenService.setCookie(new CookieLogin(result.token, result.login, this.selectedStore));
                this.tokenService.logEvent(true);
                this.router.navigate(['/menu']);
            },
            error: error => {
                console.log(error)
            }
        })
    }
}
