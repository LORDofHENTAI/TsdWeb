import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { DeleteDocumentModel } from "src/app/models/documents.model/delete-document";
import { DocumentModel } from "src/app/models/documents.model/document";
import { TokenRequest } from "src/app/models/login.models/token-request";
import { DocumentState } from "src/app/reducers/documents/documents.reducer";
import { selectDocuments } from "src/app/reducers/documents/documents.selectors";
import { DocumentsService } from "src/app/services/documents.service";
import { SnakebarService } from "src/app/services/snack-bar.service";
import { TokenService } from "src/app/services/token.service";
import { environment } from "src/environment/environment";
import * as DocumentAction from '../../reducers/documents/documents.actions'
@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
    constructor(
        private tokenService: TokenService,
        private router: Router,
        private store$: Store<DocumentState>
    ) { }
    public documents$: Observable<DocumentModel[]> = this.store$.select(selectDocuments)
    documentList: DocumentModel[]
    ngOnInit(): void {
        this.store$.dispatch(DocumentAction.getDocumentList(new TokenRequest(this.tokenService.getToken(), this.tokenService.getShop())))
    }
    DeleteDocument(element: number) {
        this.store$.dispatch(DocumentAction.deleteDocument(new DeleteDocumentModel(this.tokenService.getToken(), this.tokenService.getShop(), element)))
    }
    LoadDocument(element: number) {
        this.router.navigate(['work-space', element])
    }
    Back() {
        this.router.navigate([''])
    }
}