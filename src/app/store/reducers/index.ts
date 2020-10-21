import { createFeatureSelector, ActionReducer, MetaReducer, ActionReducerMap, Action } from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { InjectionToken } from '@angular/core';
import {
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';

import { environment } from '../../../environments/environment';

import * as fromCa from './ca.reducer';
import * as fromDrawing from './drawing.reducer';
import * as fromSpecification from './specification.reducer';
import * as fromFilter from './filters.reducer';
import * as fromMap from './map.reducer';
import * as fromMedia from './media.reducer';
import * as fromPaging from './paging.reducer';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

/** custom serializer for router state to only return the state info we need */
export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    /**
     * Only return an object including the URL, params and query params
     * instead of the entire route snapshot
     */
    return { url, params, queryParams };
  }
}

export interface State {
  [fromCa.caFeatureKey]: fromCa.State;
  [fromPaging.pagingFeatureKey]: fromPaging.State;
  [fromDrawing.drawingFeatureKey]: fromDrawing.State;
  [fromSpecification.specificationFeatureKey]: fromSpecification.State;
  [fromFilter.filtersFeatureKey]: fromFilter.State;
  [fromMap.mapFeatureKey]: fromMap.State;
  [fromMedia.mediaFeatureKey]: fromMedia.State;
  router: RouterReducerState<RouterStateUrl>;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromCa.caFeatureKey]: fromCa.reducer,
    [fromPaging.pagingFeatureKey]: fromPaging.reducer,
    [fromDrawing.drawingFeatureKey]: fromDrawing.reducer,
    [fromSpecification.specificationFeatureKey]: fromSpecification.reducer,
    [fromFilter.filtersFeatureKey]: fromFilter.reducer,
    [fromMap.mapFeatureKey]: fromMap.reducer,
    [fromMedia.mediaFeatureKey]: fromMedia.reducer,
    router: routerReducer
  }),
});

/**
 * Log actions and reducer state.  This is only used in dev mode and
 * enabled/disabled by the production property in environment file.
 * @param reducer action that has been triggered and state
 */
export function logger(reducer: ActionReducer<State>): ActionReducer<any, any> {
  return (state: State, action: any): any => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

/**
 * Reducer middleware.  This hooks into the action->reducer pipeline,
 * before the normal reducers are invoked.  Kind of like a higher order
 * reducer
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getCaState = createFeatureSelector<State, fromCa.State>(
  fromCa.caFeatureKey
);

export const getPagingState = createFeatureSelector<State, fromPaging.State>(
  fromPaging.pagingFeatureKey
);

export const getDrawingState = createFeatureSelector<State, fromDrawing.State>(
  fromDrawing.drawingFeatureKey
);

export const getSpecificationState = createFeatureSelector<State, fromSpecification.State>(
  fromSpecification.specificationFeatureKey
);

export const getFilterState = createFeatureSelector<State, fromFilter.State>(
  fromFilter.filtersFeatureKey
);

export const getMapState = createFeatureSelector<State, fromMap.State>(
  fromMap.mapFeatureKey
);

export const getMediaState = createFeatureSelector<State, fromMedia.State>(
  fromMedia.mediaFeatureKey
);

/**
 * get router slice of state
 */
export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>('router');
