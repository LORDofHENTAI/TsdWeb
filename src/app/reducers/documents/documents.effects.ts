import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { TokenRequest } from "src/app/models/login.models/token-request";
import { DocumentsService } from "src/app/services/documents.service";
import * as DocumentAction from '../documents/documents.actions'
import { props } from "@ngrx/store";
import { DocumentState } from "./documents.reducer";
import { DocumentModel } from "src/app/models/documents.model/document";
import { SnakebarService } from "src/app/services/snack-bar.service";
import { environment } from "src/environment/environment";
import { DeleteDocumentModel } from "src/app/models/documents.model/delete-document";
import { Status } from "src/app/models/status";
import { TokenService } from "src/app/services/token.service";
import { CreateDocumentModel } from "src/app/models/documents.model/create-document";
import { ActivatedRoute, Router } from "@angular/router";
import { DocumentBodyModel } from "src/app/models/documents.model/document-body";
import { AddProductModel } from "src/app/models/documents.model/add-product";
import { EditProductModel } from "src/app/models/documents.model/edit-product";
import { FindInfoReq } from "src/app/models/documents.model/find-info-req";
import { FindInfoAnswModel } from "src/app/models/documents.model/find-info-answ";
@Injectable()
export class DocumentsEffect {
    constructor(
        private actions$: Actions,
        private documentService: DocumentsService,
        private snackBarService: SnakebarService,
        private tokenService: TokenService,
        private router: Router,
    ) { }
    getDocs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DocumentAction.getDocumentList.type),
            switchMap(
                (data: TokenRequest) =>
                    this.documentService.GetDocumentList(data)
                        .pipe(
                            map(docs => {
                                return DocumentAction.getDocumentListSuccess({ docs: { documents: docs, status: 'LoadinSucces', error: null } })
                            }),
                            catchError((error) => {
                                console.error('Error', error)
                                this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
                                return of(DocumentAction.getDocumentListError({ error }))
                            })
                        )
            )
        )
    })

    deleteDoc$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DocumentAction.deleteDocument.type),
            switchMap(
                (data: DeleteDocumentModel) =>
                    this.documentService.DeleteDocument(data)
                        .pipe(
                            map(status => {
                                switch (status.status) {
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
                                return DocumentAction.deleteDocumentSuccess(status)
                            }),
                            catchError((error) => {
                                console.error('Error', error)
                                this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
                                return of(DocumentAction.deleteDocumentError({ error }))
                            })
                        )
            )
        )
    })
    deleteDocSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DocumentAction.deleteDocumentSuccess.type),
            map((status: Status) => {
                return DocumentAction.getDocumentList(new TokenRequest(this.tokenService.getToken(), this.tokenService.getShop()))
            })
        )
    })
    createDocument$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DocumentAction.createDocument.type),
            switchMap((data: CreateDocumentModel) =>
                this.documentService.CreateDocument(data)
                    .pipe(
                        map((doc: DocumentModel) => {
                            this.router.navigate(["work-space", doc.id])
                            return DocumentAction.createDocumentSuccess(doc)
                        }),
                        catchError((error) => {
                            console.error('Error', error)
                            this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
                            return of(DocumentAction.createDocumentError({ error }))
                        })
                    )
            )
        )
    })
    getDocumentBody$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DocumentAction.getDocumentBody.type),
            switchMap((data: TokenRequest) =>
                this.documentService.GetDocumentBody(data)
                    .pipe(
                        map(
                            (body: DocumentBodyModel[]) => {
                                console.log(data);

                                return DocumentAction.getDocumentBodySuccess({ body: body })
                            }
                        ),
                        catchError((error) => {
                            console.error('Error', error)
                            this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
                            return of(DocumentAction.getDocumentBodyError({ error }))
                        })
                    )
            )
        )
    })

    getTotalPrice$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DocumentAction.getDocumentBodySuccess.type),
            map((data: { body: DocumentBodyModel[] }) => {
                let totalPrice = 0
                data.body.forEach(element => {
                    if (!element.price || !element.count_e)
                        totalPrice += 0
                    else
                        totalPrice += (Number(element.price.replace(',', '.')) * Number(element.count_e))
                });
                return DocumentAction.getDocumentTotalPrice({ price: totalPrice })
            })

        )
    })
    addProductToDoc$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DocumentAction.addProductToDoc.type),
            switchMap((data: AddProductModel) =>
                this.documentService.AddProduct(data)
                    .pipe(
                        map((status: Status) => {
                            switch (status.status) {
                                case 'true':
                                    this.snackBarService.openSnackBar("Добавлено в документ", environment.action, environment.styleOK);
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
                            return DocumentAction.addProductToDocSuccess(status)
                        }),
                        catchError((error) => {
                            console.error('Error', error)
                            this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
                            return of(DocumentAction.addProductToDocError({ error }))
                        })
                    )
            )
        )
    })
    deleteDocItem$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DocumentAction.deleteDocumentItem.type),
            switchMap((token: TokenRequest) =>
                this.documentService.DeleteDocumentItem(token)
                    .pipe(
                        map((status: Status) => {
                            switch (status.status) {
                                case 'true':
                                    this.snackBarService.openSnackBar("Удалено", environment.action, environment.styleOK);
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
                            return DocumentAction.deleteDocumentItemSuccess(status)
                        }),
                        catchError((error) => {
                            console.error('Error', error)
                            this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
                            return of(DocumentAction.deleteDocumentItemError({ error }))
                        })
                    )
            )
        )
    })
    editDocumetItem$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DocumentAction.editDocumentItem.type),
            switchMap((data: EditProductModel) =>
                this.documentService.EditProduct(data)
                    .pipe(
                        map((status: Status) => {
                            switch (status.status) {
                                case 'true':
                                    this.snackBarService.openSnackBar("Сохранено", environment.action, environment.styleOK);
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
                            return DocumentAction.editDocumentItemSuccess(status)
                        }),
                        catchError((error) => {
                            console.error('Error', error)
                            this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
                            return of(DocumentAction.editDocumentItemError({ error }))
                        })
                    )
            )
        )
    })
    editDocumentItemSucces$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DocumentAction.editDocumentItemSuccess.type),
            map((status: Status) => {
                return DocumentAction.getDocumentBody(new TokenRequest(this.tokenService.getToken(), this.tokenService.getShop(), Number(status.id)))
            })
        )
    })
    sendDoc$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DocumentAction.pushDoc.type),
            switchMap((token: TokenRequest) =>
                this.documentService.PushDocument(token)
                    .pipe(
                        map((status: Status) => {
                            switch (status.status) {
                                case 'true':
                                    this.snackBarService.openSnackBar("Документ успешно отправлен", environment.action, environment.styleOK);
                                    this.router.navigate([""])
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
                            return DocumentAction.pushDocSuccess(status)
                        }),
                        catchError((error) => {
                            console.error('Error', error)
                            this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
                            return of(DocumentAction.pushDocError({ error }))
                        })
                    )
            )
        )
    })
    getDocument$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DocumentAction.selectDocument.type),
            switchMap((token: TokenRequest) =>
                this.documentService.GetDocument(token)
                    .pipe(
                        map((doc: DocumentModel) => {
                            return DocumentAction.selectDocumentSuccess(doc)
                        }),
                        catchError((error) => {
                            console.error('Error', error)
                            this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
                            return of(DocumentAction.selectDocumentError({ error }))
                        })
                    )
            )
        )
    })
    getInfo$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(DocumentAction.findInfo),
            switchMap((data: FindInfoReq) =>
                this.documentService.FindInfo(data)
                    .pipe(
                        map((info: FindInfoAnswModel) => {

                            if (!info.article)
                                this.snackBarService.openSnackBar('Товар не найден', environment.action, environment.styleNoConnect);
                            return DocumentAction.findInfoSuccess(info)
                        }),
                        catchError((error) => {
                            console.error('Error', error)
                            this.snackBarService.openSnackBar(environment.messageNoConnect, environment.action, environment.styleNoConnect);
                            return of(DocumentAction.findInfoError({ error }))
                        })
                    )))
    })

}