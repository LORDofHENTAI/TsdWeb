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
import { Store } from "@ngrx/store";
import { DocumentState } from "src/app/reducers/documents/documents.reducer";
import * as DocumentAction from '../../reducers/documents/documents.actions'
import { find, Observable } from "rxjs";
import { findInfo, selectDocument, selectDocuments } from "src/app/reducers/documents/documents.selectors";
import { DocumentModel } from "src/app/models/documents.model/document";
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
        private store$: Store<DocumentState>
    ) {
        route.params.subscribe(params => this.docId = params["docId"]);

    }
    public info$: Observable<FindInfoAnswModel> = this.store$.select(findInfo)

    docId: number
    barcode: string
    count: number
    numberInQueue: number = 1
    productInfo: FindInfoAnswModel | null = new FindInfoAnswModel('', '', '', '', '', '', '', '', '')
    clear = new FindInfoAnswModel('', '', '', '', '', '', '', '', '')

    GetProductInfo() {
        this.store$.dispatch(DocumentAction.findInfo(new FindInfoReq(null, String(this.barcode), this.tokenService.getShop())))
        var input = document.getElementById('barcodeInput')
        input.blur();
        this.info$.subscribe({
            next: result => {
                this.productInfo! = result
            }
        })
    }
    AddProductToDoc() {
        if (this.productInfo.article) {
            this.store$.dispatch(DocumentAction.addProductToDoc(new AddProductModel(this.tokenService.getToken(), this.tokenService.getShop(), this.docId, this.productInfo.article, this.productInfo.barcode, this.productInfo.name, this.count, this.numberInQueue, this.productInfo.price, this.productInfo.img_url)))
            this.numberInQueue += 1;
            this.barcode = null
            this.count = null
            this.productInfo = this.clear
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
        this.store$.dispatch(DocumentAction.pushDoc(new TokenRequest(this.tokenService.getToken(), this.tokenService.getShop(), this.docId)))
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