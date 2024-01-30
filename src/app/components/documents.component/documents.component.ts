import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DeleteDocumentModel } from "src/app/models/documents.model/delete-document";
import { DocumentModel } from "src/app/models/documents.model/document";
import { TokenRequest } from "src/app/models/login.models/token-request";
import { DocumentsService } from "src/app/services/documents.service";
import { SnakebarService } from "src/app/services/snack-bar.service";
import { TokenService } from "src/app/services/token.service";
import { environment } from "src/environment/environment";

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
    constructor(
        private documentService: DocumentsService,
        private tokenService: TokenService,
        private snackBarService: SnakebarService,
        private router: Router
    ) { }
    documentList: DocumentModel[]
    ngOnInit(): void {
        this.GetDocumentList()
    }
    GetDocumentList() {
        this.documentService.GetDocumentList(new TokenRequest(this.tokenService.getToken(), this.tokenService.getShop())).subscribe({
            next: result => {
                this.documentList = result
            },
            error: error => {
                console.log(error)
                this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
            }
        })
    }
    DeleteDocument(element: number) {
        this.documentService.DeleteDocument(new DeleteDocumentModel(this.tokenService.getToken(), this.tokenService.getShop(), element)).subscribe({
            next: result => {
                switch (result.status) {
                    case 'true':
                        this.snackBarService.openSnackBar("Документ удален", environment.action, environment.styleOK);
                        break;
                    case 'NULL':
                        this.snackBarService.openSnackBar("Неверный запрос", environment.action, environment.styleNoConnect);
                        break;
                    case 'error':
                        this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
                        break;
                    case 'BadAuth':
                        this.snackBarService.openSnackBar('Токен не действителен', environment.action, environment.styleNoConnect);
                        break;
                }
            },
            error: error => {
                console.log(error);
                this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
            }
        })
    }
    LoadDocument(element: number) {
        this.router.navigate(['work-space', element])
    }
    Back() {
        this.router.navigate([''])
    }
}