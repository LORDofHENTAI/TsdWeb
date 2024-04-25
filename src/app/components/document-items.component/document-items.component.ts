import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { DocumentBodyModel } from "src/app/models/documents.model/document-body";
import { EditProductModel } from "src/app/models/documents.model/edit-product";
import { TokenRequest } from "src/app/models/login.models/token-request";
import { DocumentsService } from "src/app/services/documents.service";
import { SnakebarService } from "src/app/services/snack-bar.service";
import { TokenService } from "src/app/services/token.service";
import { environment } from "src/environment/environment";
import { AgreeDialogComponent } from "../dialog-window/agree.dialog.component";

@Component({
    selector: 'app-document-items',
    templateUrl: './document-items.component.html',
    styleUrls: ['./document-items.component.scss']
})
export class DocumentItemsComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private tokenService: TokenService,
        private documentService: DocumentsService,
        private snackBarService: SnakebarService,
        private dialog: MatDialog,
    ) {
        route.params.subscribe(params => this.docId = params["docId"]);
    }
    docId: number

    items: DocumentBodyModel[] = []
    totalPrice: number = 0
    ngOnInit(): void {
        this.GetDocumentItems()
    }
    GetDocumentItems() {
        this.documentService.GetDocumentBody(new TokenRequest(this.tokenService.getToken(), this.tokenService.getShop(), this.docId)).subscribe({
            next: result => {
                this.items = result
                result.forEach(element => {
                    console.log(element)
                    if (!element.price || !element.count_e)
                        this.totalPrice += 0
                    else
                        this.totalPrice += (Number(element.price.replace(',', '.')) * Number(element.count_e))
                });
            },
            error: error => {
                console.log(error)
            }
        })
    }
    DeleteItem(element: number) {
        this.documentService.DeleteDocumentItem(new TokenRequest(this.tokenService.getToken(), this.tokenService.getShop(), element)).subscribe({
            next: result => {
                switch (result.status) {
                    case 'true':
                        this.snackBarService.openSnackBar('Удалено', environment.action, environment.styleOK);
                        this.GetDocumentItems()
                        break;
                    case 'BadAuth':
                        this.snackBarService.openSnackBar('Токен устарел', environment.action, environment.styleNoConnect);
                        break;
                    case 'NULL':
                        this.snackBarService.openSnackBar('NULL', environment.action, environment.styleNoConnect);
                        break;
                    case 'error':
                        this.snackBarService.openSnackBar('Ошибка', environment.action, environment.styleNoConnect);
                        break;
                }
            },
            error: error => {
                console.log(error)
                this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
            }
        })
    }
    switchEdit: boolean = false
    count: number
    numb: number
    EditItem(element: number, count?: string, numb?: number) {
        if (this.switchEdit === false) {
            this.switchEdit = !this.switchEdit
            this.count = Number(count)
            this.numb = numb
        } else {
            this.documentService.EditProduct(new EditProductModel(this.tokenService.getToken(), this.tokenService.getShop(), element, this.count, this.numb)).subscribe({
                next: result => {
                    switch (result.status) {
                        case 'true':
                            this.snackBarService.openSnackBar('Сохранено', environment.action, environment.styleOK);
                            this.GetDocumentItems()
                            this.switchEdit = !this.switchEdit
                            break;
                        case 'BadAuth':
                            this.snackBarService.openSnackBar('Токен устарел', environment.action, environment.styleNoConnect);
                            break;
                        case 'NULL':
                            this.snackBarService.openSnackBar('NULL', environment.action, environment.styleNoConnect);
                            break;
                        case 'error':
                            this.snackBarService.openSnackBar('Ошибка', environment.action, environment.styleNoConnect);
                            break;
                    }
                },
                error: error => {
                    console.log(error)
                    this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
                }
            })
        }
    }
    pushDoc() {
        this.documentService.PushDocument(new TokenRequest(this.tokenService.getToken(), this.tokenService.getShop(), this.docId)).subscribe({
            next: result => {
                switch (result.status) {
                    case 'true':
                        this.snackBarService.openSnackBar('Документ успешно отправлен на сервер', environment.action, environment.styleOK);
                        this.router.navigate([''])
                        break;
                    case 'BadAuth':
                        this.snackBarService.openSnackBar('Токен устарел', environment.action, environment.styleNoConnect);
                        break;
                    case 'NULL':
                        this.snackBarService.openSnackBar('NULL', environment.action, environment.styleNoConnect);
                        break;
                    case 'error':
                        this.snackBarService.openSnackBar('Ошибка', environment.action, environment.styleNoConnect);
                        break;
                }
            },
            error: error => {
                console.log(error)
            }
        })
    }
    openAgreeDialog() {
        const dialogRef = this.dialog.open(AgreeDialogComponent)
        dialogRef.afterClosed().subscribe(result => {
            switch (result) {
                case "true":
                    this.pushDoc();
                    break;
                case "false":
                    break;
            }
        });
    }
    goWorkSpace() {
        this.router.navigate(["work-space", this.docId])
    }
    goBack() {
        this.router.navigate([''])
    }
}