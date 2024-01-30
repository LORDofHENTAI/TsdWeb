import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environment/environment';
import { Subject } from 'rxjs';
import { CookieLogin } from '../models/login.models/cookie-login';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    cookieName = environment.cookieName;

    public _subject = new Subject<any>();

    constructor(
        private cookieService: CookieService,
    ) { }

    logEvent(event: any) {
        this._subject.next(event);
    }

    get events$() {
        return this._subject.asObservable();
    }

    getToken(): string {
        try {
            if (this.cookieService.check(this.cookieName)) {
                let fullData = this.cookieService.get(this.cookieName);
                let loginFromCookie = JSON.parse(fullData);
                if (loginFromCookie) {
                    return loginFromCookie.token;
                }
            }
            else return '';
            return '';
        }
        catch (error) {
            console.error();
            alert('login error')
            return '';
        }
    }

    getLogin(): string {
        try {
            if (this.cookieService.check(this.cookieName)) {
                let fullData = this.cookieService.get(this.cookieName);
                let loginFromCookie = JSON.parse(fullData);
                if (loginFromCookie) {
                    return loginFromCookie.login;
                }
            }
            else return '';
            return '';
        }
        catch (error) {
            console.error();
            alert('login error')
            return '';
        }
    }

    getShop(): string {
        try {
            if (this.cookieService.check(this.cookieName)) {
                let fullData = this.cookieService.get(this.cookieName);
                let loginFromCookie = JSON.parse(fullData);
                if (loginFromCookie) {
                    return loginFromCookie.storeLoc;
                }
            }
            else return '';
            return ''
        }
        catch (error) {
            console.error();
            alert('login error')
            return ''
        }
    }

    // getType(): string {
    //     try {
    //         if (this.cookieService.check(this.cookieName)) {
    //             let fullData = this.cookieService.get(this.cookieName);
    //             let loginFromCookie = JSON.parse(fullData);
    //             if (loginFromCookie) {
    //                 return loginFromCookie.typeId;
    //             }
    //         }
    //         else return '';
    //     }
    //     catch (error) {
    //         console.error();
    //         alert('login error')
    //     }
    // }

    // getDepartment(): string {
    //     try {
    //         if (this.cookieService.check(this.cookieName)) {
    //             let fullData = this.cookieService.get(this.cookieName);
    //             let loginFromCookie = JSON.parse(fullData);
    //             if (loginFromCookie) {
    //                 return loginFromCookie.departmentId;
    //             }
    //         }
    //         else return '';
    //     }
    //     catch (error) {
    //         console.error();
    //         alert('login error')
    //     }
    // }

    // getIsAdmin(): string {
    //     try {
    //         if (this.cookieService.check(this.cookieName)) {
    //             let fullData = this.cookieService.get(this.cookieName);
    //             let loginFromCookie = JSON.parse(fullData);
    //             if (loginFromCookie) {
    //                 if (loginFromCookie.adminCount)
    //                     return loginFromCookie.adminCount;
    //                 else return '0';
    //             }
    //         }
    //         else return '';
    //     }
    //     catch (error) {
    //         console.error();
    //         alert('login error')
    //     }
    // }

    // getGroup() {
    //     try {
    //         if (this.cookieService.check(this.cookieName)) {
    //             let fullData = this.cookieService.get(this.cookieName);
    //             let loginFromCookie = JSON.parse(fullData);
    //             if (loginFromCookie) {
    //                 return loginFromCookie.title;
    //             }
    //         }
    //         else return '';
    //     }
    //     catch (error) {
    //         console.error();
    //         alert('login error')
    //     }
    // }

    getCookie(): CookieLogin {
        try {
            if (this.cookieService.check(this.cookieName)) {
                let fullData = this.cookieService.get(this.cookieName);
                let loginFromCookie = JSON.parse(fullData);
                if (loginFromCookie) {
                    return loginFromCookie;
                }
            }
            else return null;
            return null
        }
        catch (error) {
            console.error();
            alert('login error')
            return null
        }
    }

    deleteCookie() {
        if (this.cookieService.check(this.cookieName)) {
            let cookie = this.getCookie();
            this.cookieService.delete(this.cookieName);
            this.setCookie(new CookieLogin('', '', null));
        }
    }

    // isLoginUser(): boolean {
    //     try {
    //         if (this.cookieService.check(this.cookieName)) {
    //             let fullData = this.cookieService.get(this.cookieName);
    //             let loginFromCookie = JSON.parse(fullData);
    //             if (loginFromCookie.token) {
    //                 return true;
    //             }
    //         }
    //         else return false;
    //     }
    //     catch (error) {
    //         console.error();
    //         alert('login error')
    //     }
    // }

    setCookie(login: CookieLogin) {
        let loginJson = JSON.stringify(login);
        this.cookieService.set(this.cookieName, loginJson, 365);
    }
}