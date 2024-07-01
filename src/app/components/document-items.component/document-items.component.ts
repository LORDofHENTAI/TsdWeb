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
import { DocumentState } from "src/app/reducers/documents/documents.reducer";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectedDocumentBody, selectedDocumentTotalPrice } from "src/app/reducers/documents/documents.selectors";
import * as DocumentAction from '../../reducers/documents/documents.actions'
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
        private store$: Store<DocumentState>
    ) {
        route.params.subscribe(params => this.docId = params["docId"]);
    }
    public documentBody$: Observable<DocumentBodyModel[]> = this.store$.select(selectedDocumentBody)
    public totalPrice$: Observable<number> = this.store$.select(selectedDocumentTotalPrice)
    docId: number

    ngOnInit(): void {
        this.store$.dispatch(DocumentAction.getDocumentBody(new TokenRequest(this.tokenService.getToken(), this.tokenService.getShop(), this.docId)))
    }
    DeleteItem(element: number) {
        this.store$.dispatch(DocumentAction.deleteDocumentItem(new TokenRequest(this.tokenService.getToken(), this.tokenService.getShop(), element)))
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
            this.store$.dispatch(DocumentAction.editDocumentItem(new EditProductModel(this.tokenService.getToken(), this.tokenService.getShop(), element, this.count, this.numb)))
            this.switchEdit = !this.switchEdit
        }
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
    goWorkSpace() {
        this.router.navigate(["work-space", this.docId])
    }
    goBack() {
        this.router.navigate([''])
    }
}