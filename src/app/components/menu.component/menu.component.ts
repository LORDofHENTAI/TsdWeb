import { Component } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { CreateDocumentModel } from "src/app/models/documents.model/create-document";
import { DocumentModel } from "src/app/models/documents.model/document";
import { TokenRequest } from "src/app/models/login.models/token-request";
import { DocumentState } from "src/app/reducers/documents/documents.reducer";
import { selectDocument } from "src/app/reducers/documents/documents.selectors";
import { DocumentsService } from "src/app/services/documents.service";
import { LoginService } from "src/app/services/login.service";
import { SnakebarService } from "src/app/services/snack-bar.service";
import { TokenService } from "src/app/services/token.service";
import { environment } from "src/environment/environment";
import * as DocumentAction from '../../reducers/documents/documents.actions'
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
    openExitDialog() {
        const dialogRef = this.dialog.open(ExitDialog)
        dialogRef.afterClosed().subscribe(result => {
            switch (result) {
                case "true":
                    this.LogOut()
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
        private store$: Store<DocumentState>
    ) { }
    docId: string
    docName: string
    docType: string
    public doc$: Observable<DocumentModel> = this.store$.select(selectDocument)
    createDoc() {
        this.store$.dispatch(DocumentAction.createDocument(new CreateDocumentModel(this.docName, this.tokenService.getLogin(), this.docType, this.tokenService.getToken(), this.tokenService.getShop())))
        this.dialogRef.close("true")
    }

}

@Component({
    templateUrl: './confirm-dialog/confirm-dialog.html',
    styleUrls: ['./menu.component.scss']
})
export class ExitDialog {
    constructor(
        public dialogRef: MatDialogRef<ExitDialog>,
    ) { }
    apply() {
        this.dialogRef.close("true")
    }
}