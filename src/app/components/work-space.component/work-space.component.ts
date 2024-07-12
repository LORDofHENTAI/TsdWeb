import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { AddProductModel } from "src/app/models/documents.model/add-product";
import { FindInfoAnswModel } from "src/app/models/documents.model/find-info-answ";
import { FindInfoReq } from "src/app/models/documents.model/find-info-req";
import { TokenRequest } from "src/app/models/login.models/token-request";
import { DocumentsService } from "src/app/services/documents.service";
import { SnakebarService } from "src/app/services/snack-bar.service";
import { TokenService } from "src/app/services/token.service";
import { environment } from "src/environment/environment";
import { AgreeDialogComponent } from "../dialog-window/agree.dialog.component";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-work-space',
    templateUrl: './work-space.component.html',
    styleUrls: ['./work-space.component.scss']
})
export class WorkSpaceComponent {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private documentService: DocumentsService,
        private tokenService: TokenService,
        private snackBarService: SnakebarService,
        private dialog: MatDialog,
    ) {
        route.params.subscribe(params => this.docId = params["docId"]);
    }
    docId: number
    barcode: string
    count: number
    numberInQueue: number = 1
    inputForm = new FormGroup({
        'count': new FormControl(null),
        'number': new FormControl(1),
    })
    productInfo: FindInfoAnswModel = new FindInfoAnswModel('', '', '', '', '', '', '', '', '')
    clear = new FindInfoAnswModel('', '', '', '', '', '', '', '', '')
    GetProductInfo() {
        this.documentService.FindInfo(new FindInfoReq(null, String(this.barcode), this.tokenService.getShop())).subscribe({
            next: result => {
                var input = document.getElementById('barcodeInput')
                input.blur();
                console.log(result)
                if (result.article)
                    this.productInfo = result
                else
                    this.snackBarService.openSnackBar('Товар не найден', environment.action, environment.styleNoConnect);
            },
            error: error => {
                console.log(error)
            }
        })
    }
    AddProductToDoc() {
        if (this.productInfo.article) {
            let prod = new AddProductModel(this.tokenService.getToken(), this.tokenService.getShop(), this.docId, this.productInfo.article, this.productInfo.barcode, this.productInfo.name, this.inputForm.value.count, this.inputForm.value.number, this.productInfo.price, this.productInfo.img_url)
            console.log(prod)
            this.documentService.AddProduct(prod).subscribe({
                next: result => {
                    switch (result.status) {
                        case 'true':
                            this.snackBarService.openSnackBar('Добавлено', environment.action, environment.styleOK);
                            this.barcode = null
                            this.inputForm.setValue({
                                count: 0,
                                number: this.inputForm.value.number + 1
                            })
                            this.productInfo = this.clear
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
                    this.snackBarService.openSnackBar('Добавлено', environment.action, environment.styleNoConnect);
                }
            })
        } else
            this.snackBarService.openSnackBar('Отсканируйте ШК', environment.action, environment.styleNoConnect);

    }
    InputHandel(event: any) {
        var number = event.target.value;
        if (number.length >= 13) {
            this.GetProductInfo()
        }

    }
    openDocumentItems() {
        this.router.navigate(["document-items", this.docId])
    }
    goBack() {
        this.router.navigate([''])
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
}