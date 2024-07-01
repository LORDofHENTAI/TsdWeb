import { createFeatureSelector, createSelector } from "@ngrx/store";
import { documentsFeatureKey, DocumentState } from "./documents.reducer";
import { DocumentModel } from "src/app/models/documents.model/document";
import { state } from "@angular/animations";
import { DocumentBodyModel } from "src/app/models/documents.model/document-body";
import { FindInfoAnswModel } from "src/app/models/documents.model/find-info-answ";

export const selectDocumentsFeature = createFeatureSelector<DocumentState>(documentsFeatureKey)

export const selectDocuments = createSelector(
    selectDocumentsFeature,
    (state: DocumentState): DocumentModel[] => state.documents
)
export const selectDocument = createSelector(
    selectDocumentsFeature,
    (state: DocumentState): any => state.selectedDocument
)
export const selectedDocumentBody = createSelector(
    selectDocumentsFeature,
    (state: DocumentState): DocumentBodyModel[] => state.selectedDocumentBody
)
export const selectedDocumentTotalPrice = createSelector(
    selectDocumentsFeature,
    (state: DocumentState): number => state.selectedDocumentTotalPrice
)
export const findInfo = createSelector(
    selectDocumentsFeature,
    (state: DocumentState): FindInfoAnswModel => state.findInfo
)

