import { isDevMode } from "@angular/core";
import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { documentReducer, documentsFeatureKey, DocumentState } from "./documents/documents.reducer";


export interface State {
    [documentsFeatureKey]: DocumentState
}

export const reducers: ActionReducerMap<State, any> = {
    [documentsFeatureKey]: documentReducer
};
export const metaReducers: MetaReducer<State, any>[] = !isDevMode() ? [] : [];