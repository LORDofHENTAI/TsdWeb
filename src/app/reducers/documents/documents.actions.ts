import { createAction, props } from '@ngrx/store';
import { DocumentModel } from 'src/app/models/documents.model/document';
import { TokenRequest } from 'src/app/models/login.models/token-request';
import { DocumentState } from './documents.reducer';
import { DeleteDocumentModel } from 'src/app/models/documents.model/delete-document';
import { Status } from 'src/app/models/status';
import { CreateDocumentModel } from 'src/app/models/documents.model/create-document';
import { DocumentBodyModel } from 'src/app/models/documents.model/document-body';
import { AddProductModel } from 'src/app/models/documents.model/add-product';
import { EditProductModel } from 'src/app/models/documents.model/edit-product';
import { FindInfoReq } from 'src/app/models/documents.model/find-info-req';
import { FindInfoAnswModel } from 'src/app/models/documents.model/find-info-answ';


export const getDocumentList = createAction('[Documents/Page] GetDocumentList', props<TokenRequest>())
export const getDocumentListSuccess = createAction('[Documents/Api] GetDocumentListSuccess', props<{ docs: DocumentState }>())
export const getDocumentListError = createAction('[Documents/Api] GetDocumentListError', props<{ error: any }>())

export const deleteDocument = createAction('[Documents/Page] DeleteDocument', props<DeleteDocumentModel>())
export const deleteDocumentSuccess = createAction('[Documents/Api] DeleteDocumentSuccess', props<Status>())
export const deleteDocumentError = createAction('[Documents/Api] DeleteDocumentError', props<{ error: any }>())

export const createDocument = createAction('[Documents/Page] CreateDocument', props<CreateDocumentModel>())
export const createDocumentSuccess = createAction('[Documents/Api] CreateDocumentSuccess', props<DocumentModel>())
export const createDocumentError = createAction('[Documents/Api] CreateDocumentError', props<{ error: any }>())

export const getDocumentBody = createAction('[Documents/Page] getDocumentBody', props<TokenRequest>())
export const getDocumentBodySuccess = createAction('[Documents/Api] getDocumentBodySuccess', props<{ body: DocumentBodyModel[] }>())
export const getDocumentBodyError = createAction('[Documents/Api] getDocumentBodyError', props<{ error: any }>())
export const getDocumentTotalPrice = createAction('[Document/Api] getDocumentTotalPrice', props<{ price: number }>())

export const addProductToDoc = createAction('[Dcouments/Page] addProductToDoc', props<AddProductModel>())
export const addProductToDocSuccess = createAction('[Documents/Api] addProductToDocSuccess', props<Status>())
export const addProductToDocError = createAction('[Documents/Api] addProductToDocError', props<{ error: any }>())

export const deleteDocumentItem = createAction('[Documents/Page] deleteDocumentItem', props<TokenRequest>())
export const deleteDocumentItemSuccess = createAction('[Documents/Api] deleteDocumentItemSuccess', props<Status>())
export const deleteDocumentItemError = createAction('[Documents/Api] deleteDocumentsItemError', props<{ error: any }>())

export const editDocumentItem = createAction('[Documents/Page] editDocumentItem', props<EditProductModel>())
export const editDocumentItemSuccess = createAction('[Documents/Api] editDocumentItemSuccess', props<Status>())
export const editDocumentItemError = createAction('[Documents/Api] editDocumentItemError', props<{ error: any }>())

export const pushDoc = createAction('[Documents/Page] pushDoc', props<TokenRequest>())
export const pushDocSuccess = createAction('[Documents/Api] pushDocSuccess', props<Status>())
export const pushDocError = createAction('[Documents/Api] pushDocError', props<{ error: any }>())

export const selectDocument = createAction('[Documents/Pages] selectDocument', props<TokenRequest>())
export const selectDocumentSuccess = createAction('[Documents/Api] selectDocumentSuccess', props<DocumentModel>())
export const selectDocumentError = createAction('[Documents/Api] selectDocumentError', props<{ error: any }>())

export const findInfo = createAction('[Documents/Pages] findInfo', props<FindInfoReq>())
export const findInfoSuccess = createAction('[Documents/Api]findInfoSuccess', props<FindInfoAnswModel>())
export const findInfoError = createAction('[Documents/Api] findInfoError', props<{ error: any }>())