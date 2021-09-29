import { Action } from "@ngrx/store";
import { ApiBrief } from "../models/Api-brief.model";

export const SWAGGER_ADD_API = 'SWAGGER_ADD_API';
export const SWAGGER_ADD_SWAGGER = 'SWAGGER_ADD_SWAGGER';
export const SWAGGER_UPDATE_API = 'SWAGGER_UPDATE_API';
export const SWAGGER_DELETE_API = 'SWAGGER_DELETE_API';

export type swaggerActions = AddApiAction | AddApis | DeleteApi | UpdateApi;

export class AddApiAction implements Action {
    readonly type = SWAGGER_ADD_API;
    constructor(public payload: ApiBrief) { }
}

export class AddApis implements Action {
    readonly type = SWAGGER_ADD_SWAGGER;
    constructor(public payload: ApiBrief[]) { }
}

export class DeleteApi implements Action {
    readonly type = SWAGGER_DELETE_API;
    constructor(public payload: ApiBrief) { }
}

export class UpdateApi implements Action {
    readonly type = SWAGGER_UPDATE_API;
    constructor(public payload: { apiBrief: ApiBrief, index: number }) { }
}