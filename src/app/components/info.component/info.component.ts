import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FindInfoAnswModel } from "src/app/models/documents.model/find-info-answ";
import { FindInfoReq } from "src/app/models/documents.model/find-info-req";
import { TokenRequest } from "src/app/models/login.models/token-request";
import { StoreListModel } from "src/app/models/store-list";
import { DocumentsService } from "src/app/services/documents.service";
import { LoginService } from "src/app/services/login.service";
import { TokenService } from "src/app/services/token.service";
@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
    constructor(
        private router: Router,
        private loginService: LoginService,
        private documentService: DocumentsService,
        private tokenService: TokenService,
    ) {
    }
    storeList: StoreListModel[]
    selectedStore: number = 8
    image: string

    article: string
    barcode: string
    info: FindInfoAnswModel = new FindInfoAnswModel('', '', '', '', '', '', '', '', '')
    clear = new FindInfoAnswModel('', '', '', '', '', '', '', '', '')

    ngOnInit(): void {
        this.GetStoreList()
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
    inputHandleBarcode(event: any) {
        var number = event.target.value;
        if (number.length >= 13) {
            this.FindInfo()
        }
    }
    inputHandleArticle(event: any) {
        var number = event.target.value;
        if (number.length >= 6) {
            this.FindInfo()
        }
    }
    FindInfo() {
        let req = new FindInfoReq(this.article ? this.article : null, this.barcode ? this.barcode : null, this.tokenService.getShop())
        this.documentService.FindInfo(req).subscribe({
            next: res => {
                var inputArticle = document.getElementById('inputArticle')
                var inputBarcode = document.getElementById('inputBarcode')
                inputArticle.blur()
                inputBarcode.blur()
                this.info = res
                this.article = res.article
                this.barcode = res.barcode
                console.log(this.info)
            },
            error: error => {
                console.log(error)
            }
        })
    }

    allClear() {
        this.info = this.clear
        this.article = null
        this.barcode = null
    }
    goBack() {
        this.router.navigate([''])
    }
    goMore() {
        window.location.href = `https://mile.by/search/?q=${this.info.article}`;
    }
}