import { createReducer, on } from "@ngrx/store";
import * as DocumentAction from '../documents/documents.actions'
import { DocumentModel } from "src/app/models/documents.model/document";
import { DocumentBodyModel } from "src/app/models/documents.model/document-body";
import { FindInfoAnswModel } from "src/app/models/documents.model/find-info-answ";
import { state } from "@angular/animations";

export const documentsFeatureKey = 'documents';

export interface DocumentState {
    documents: DocumentModel[],
    status: string,
    error: string,
    selectedDocument?: DocumentModel
    selectedDocumentBody?: DocumentBodyModel[]
    selectedDocumentTotalPrice?: number
    findInfo?: FindInfoAnswModel
}
const initialState: DocumentState = {
    documents: null,
    status: null,
    error: null,
    selectedDocument: null,
    selectedDocumentTotalPrice: null,
    findInfo: new FindInfoAnswModel('', '', '', '', '', '', '', '', '')
}
export const documentReducer = createReducer(
    initialState,
    on(DocumentAction.getDocumentList, (state) => ({
        ...state,
        status: 'Loading Data'
    })),
    on(DocumentAction.getDocumentListSuccess, (state, docs) => ({
        ...state,
        status: docs.docs.status,
        documents: docs.docs.documents
    })),
    on(DocumentAction.getDocumentListError, (state, error) => ({
        ...state,
        error: error.error
    })),
    on(DocumentAction.deleteDocument, (state) => ({
        ...state,
        status: 'Start deleteing document'
    })),
    on(DocumentAction.deleteDocumentSuccess, (state, status) => ({
        ...state,
        selectedDocument: null,
        selectedDocumentBody: null,
        selectedDocumentTotalPrice: null,
        status: status.status
    })),
    on(DocumentAction.deleteDocumentError, (state, error) => ({
        ...state,
        status: 'Error to delete document',
        error: error.error
    })),
    on(DocumentAction.createDocument, (state) => ({
        ...state,
        status: 'Creating document'
    })),
    on(DocumentAction.createDocumentSuccess, (state, doc) => ({
        ...state,
        status: 'Document has been created',
        selectedDocument: doc
    })),
    on(DocumentAction.createDocumentError, (state, error) => ({
        ...state,
        status: 'Error',
        error: error.error
    })),
    on(DocumentAction.getDocumentBody, (state) => ({
        ...state,
        status: 'Geting document body'
    })),
    on(DocumentAction.getDocumentBodySuccess, (state, body) => ({
        ...state,
        status: 'Geting document body success',
        selectedDocumentBody: body.body
    })),
    on(DocumentAction.getDocumentBodyError, (state, error) => ({
        ...state,
        status: 'Error',
        error: error.error
    })),
    on(DocumentAction.getDocumentTotalPrice, (state, price) => ({
        ...state,
        selectedDocumentTotalPrice: price.price
    })),
    on(DocumentAction.addProductToDoc, (state) => ({
        ...state,
        status: 'Add product to document'
    })),
    on(DocumentAction.addProductToDocSuccess, (state) => ({
        ...state,
        findInfo: null,
        status: 'product has been add to doc'
    })),
    on(DocumentAction.addProductToDocError, (state, error) => ({
        ...state,
        error: error.error
    })),
    on(DocumentAction.deleteDocumentItem, (state) => ({
        ...state,
        status: 'Deleting product from doc'
    })),
    on(DocumentAction.deleteDocumentItemSuccess, (state) => ({
        ...state,
        status: 'product has been deleted from doc'
    })),
    on(DocumentAction.deleteDocumentItemError, (state, error) => ({
        ...state,
        status: 'Error',
        error: error.error
    })),
    on(DocumentAction.editDocumentItem, (state) => ({
        ...state,
        status: 'doc item has been edit'
    })),
    on(DocumentAction.editDocumentItemSuccess, (state) => ({
        ...state,
        status: 'edit doc item succes',
    })),
    on(DocumentAction.editDocumentItemError, (state, error) => ({
        ...state,
        status: 'Error',
        error: error.error
    })),
    on(DocumentAction.pushDoc, (state) => ({
        ...state,
        status: 'send doc to serve'
    })),
    on(DocumentAction.pushDocSuccess, (state) => ({
        ...state,
        status: 'Doc has been sended'
    })),
    on(DocumentAction.pushDocError, (state, error) => ({
        ...state,
        status: 'error of send doc',
        selectedDocument: null,
        selectedDocumentBody: null,
        selectedDocumentTotalPrice: null,
        error: error.error
    })),
    on(DocumentAction.selectDocument, (state) => ({
        ...state,
        status: 'get Document'
    })),
    on(DocumentAction.selectDocumentSuccess, (state, doc) => ({
        ...state,
        status: 'document has been loaded',
        selectedDocument: doc
    })),
    on(DocumentAction.selectDocumentError, (state, error) => ({
        ...state,
        status: 'document has been loaded',
        error: error.error
    })),
    on(DocumentAction.findInfo, (state) => ({
        ...state,
        status: 'Geting product info'
    })),
    on(DocumentAction.findInfoSuccess, (state, info) => ({
        ...state,
        findInfo: info,
        status: 'Geting ifo success'
    })),
    on(DocumentAction.findInfoError, (state, error) => ({
        ...state,
        status: 'info error',
        error: error.error
    }))
)
