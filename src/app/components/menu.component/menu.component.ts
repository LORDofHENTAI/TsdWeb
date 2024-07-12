import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { CreateDocumentModel } from "src/app/models/documents.model/create-document";
import { TokenRequest } from "src/app/models/login.models/token-request";
import { DocumentsService } from "src/app/services/documents.service";
import { LoginService } from "src/app/services/login.service";
import { SnakebarService } from "src/app/services/snack-bar.service";
import { TokenService } from "src/app/services/token.service";
import { environment } from "src/environment/environment";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    constructor(
        private dialog: MatDialog,
        private snackBarServcie: SnakebarService,
        private loginService: LoginService,
        private tokenService: TokenService,
        private router: Router,
    ) { }

    openDialog() {
        const dialogRef = this.dialog.open(CreateDocumentDialog)
        dialogRef.afterClosed().subscribe(result => {
            switch (result) {
                case "true":
                    break;
                case "error":
                    this.snackBarServcie.openSnackBar("Ошибка создания документа", environment.action, environment.styleNoConnect)
                    break;
            }
        });
    }
    LogOut() {
        this.loginService.LogOut(new TokenRequest(this.tokenService.getToken())).subscribe({
            next: result => {
                this.tokenService.deleteCookie();
                this.router.navigate(["login"])
            },
            error: error => {
                console.log()
            }
        })
    }
}

@Component({
    templateUrl: './create-document-dialog-window/create-document.dialog.html',
    styleUrls: ['./menu.component.scss']
})
export class CreateDocumentDialog {
    constructor(
        private router: Router,
        public dialogRef: MatDialogRef<CreateDocumentDialog>,
        private documentService: DocumentsService,
        private tokenService: TokenService,
    ) { }
    docId: string
    docName: string
    docType: string
    createDoc() {
        let doc = new CreateDocumentModel(this.docName, this.tokenService.getLogin(), this.docType, this.tokenService.getToken(), this.tokenService.getShop())
        this.documentService.CreateDocument(doc).subscribe({
            next: result => {
                if (result) {
                    this.router.navigate(["work-space", result.id])
                    this.dialogRef.close("true")
                }
                else
                    this.dialogRef.close("error")
            },
            error: error => {
                console.log(error)
                this.dialogRef.close("error")
            }
        })
    }
    docInputHandler() {
        if (this.docName.length >= 14) {
            let LIT1 = this.docName.substring(3, 5)
            let LIT2 = this.docName.substring(5, 7)
            let NUM = this.docName.substring(7, 14)
            this.docName = this.GetLIT(LIT1) + this.GetLIT(LIT2) + NUM
        }
    }
    GetLIT(value: string) {

        switch (value) {
            case "01":
                return "А";
            case "02":
                return "Б";
            case "03":
                return "В";
            case "04":
                return "Г";
            case "05":
                return "Д";
            case "06":
                return "Е";
            case "07":
                return "Ж";
            case "08":
                return "И";
            case "09":
                return "К";
            case "10":
                return "Л";
            case "11":
                return "М";
            case "12":
                return "Н";
            case "13":
                return "О";
            case "14":
                return "П";
            case "15":
                return "Р";
            case "16":
                return "С";
            case "17":
                return "Т";
            case "18":
                return "У";
            case "19":
                return "Ф"
            case "20":
                return "Х";
            case "21":
                return "Ч";
            case "22":
                return "Ш";
            case "23":
                return "Э";
            case "24":
                return "Ю";
            case "25":
                return "Я";
            default: return "-";
        };
    }
}