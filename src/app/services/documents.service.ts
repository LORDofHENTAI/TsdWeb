import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environment/environment";
import { CreateDocumentModel } from "../models/documents.model/create-document";
import { Observable } from "rxjs";
import { DocumentModel } from "../models/documents.model/document";
import { TokenRequest } from "../models/login.models/token-request";
import { Status } from "../models/status";
import { DeleteDocumentModel } from "../models/documents.model/delete-document";
import { FindInfoReq } from "../models/documents.model/find-info-req";
import { FindInfoAnswModel } from "../models/documents.model/find-info-answ";
import { AddProductModel } from "../models/documents.model/add-product";
import { DocumentBodyModel } from "../models/documents.model/document-body";
import { EditProductModel } from "../models/documents.model/edit-product";
@Injectable({
    providedIn: 'root'
})
export class DocumentsService {
    constructor(
        private http: HttpClient
    ) { }
    createDocumentURL = environment.apiUrl + 'CreateDoc'
    getDocumentListURL = environment.apiUrl + 'GetDocumentList'
    deleteDocumentURL = environment.apiUrl + 'DeleteDocument'
    getDocumentURL = environment.apiUrl + 'GetDocument'
    findInfoURL = environment.apiUrl + 'FindInfo'
    addProductURL = environment.apiUrl + 'AddProductToDoc'
    getDocumentBodyURL = environment.apiUrl + 'GetDocumentBody'
    deleteDocumentItemURL = environment.apiUrl + 'DeleteDocumentItem'
    editProductURL = environment.apiUrl + 'EditDocumentItem'
    pushDocumentURL = environment.apiUrl + 'PushDocument'
    CreateDocument(data: CreateDocumentModel): Observable<DocumentModel> {
        return this.http.post<DocumentModel>(this.createDocumentURL, data)
    }
    GetDocumentList(data: TokenRequest): Observable<DocumentModel[]> {
        return this.http.post<DocumentModel[]>(this.getDocumentListURL, data)
    }
    DeleteDocument(data: DeleteDocumentModel): Observable<Status> {
        return this.http.post<Status>(this.deleteDocumentURL, data)
    }
    GetDocument(data: TokenRequest): Observable<DocumentModel> {
        return this.http.post<DocumentModel>(this.getDocumentURL, data)
    }
    FindInfo(data: FindInfoReq): Observable<FindInfoAnswModel> {
        return this.http.post<FindInfoAnswModel>(this.findInfoURL, data)
    }
    AddProduct(data: AddProductModel): Observable<Status> {
        return this.http.post<Status>(this.addProductURL, data)
    }
    GetDocumentBody(data: TokenRequest): Observable<DocumentBodyModel[]> {
        return this.http.post<DocumentBodyModel[]>(this.getDocumentBodyURL, data)
    }
    DeleteDocumentItem(data: TokenRequest): Observable<Status> {
        return this.http.post<Status>(this.deleteDocumentItemURL, data)
    }
    EditProduct(data: EditProductModel): Observable<Status> {
        return this.http.post<Status>(this.editProductURL, data)
    }
    PushDocument(data: TokenRequest): Observable<Status> {
        return this.http.post<Status>(this.pushDocumentURL, data)
    }
}