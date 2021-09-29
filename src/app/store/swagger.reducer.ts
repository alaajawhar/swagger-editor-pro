import { Action } from "@ngrx/store";
import { ApiBrief } from '../models/Api-brief.model';
import * as apiActions from './swagger.action'


const initialState = {
    swagger: []
}

export function swaggerReducer(state = initialState, action: apiActions.swaggerActions) { //apiActions.AddApiAction
    switch (action.type) {
        case apiActions.SWAGGER_ADD_SWAGGER:
            return {
                ...state,
                swagger: [...state.swagger, ...action.payload]
            }
        case apiActions.SWAGGER_UPDATE_API:
            const oldApi = state.swagger[action.payload.index];
            const updatedApi = {
                oldApi,
                ...action.payload.apiBrief
            }
            const updatedSwagger = [...state.swagger]
            // @ts-ignore
            updatedSwagger[action.payload.index] = updatedApi;
            return {
                ...state,
                swagger: updatedSwagger
            }

        case apiActions.SWAGGER_ADD_API:
            return {
                ...state,
                swagger: [...state.swagger, action.payload]
            }
        case apiActions.SWAGGER_DELETE_API:
            return {
                ...state,
                swagger: state.swagger.filter((api: ApiBrief) => {
                    return !(api.verb === action.payload.verb && api.endpoint === action.payload.endpoint)
                })
            }
        default:
            return state;
    }
}