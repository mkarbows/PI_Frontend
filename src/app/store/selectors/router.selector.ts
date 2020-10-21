import { createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';
import { Params } from '@angular/router';

// reducers
import { RouterStateUrl } from '../reducers';
import * as fromFeature from '../reducers';

export const getRouteParams = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): Params => {
    return routerState && routerState.state.params;
  }
);

export const getRouteQueryParams = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): Params => {
    return routerState && routerState.state.queryParams;
  }
);


