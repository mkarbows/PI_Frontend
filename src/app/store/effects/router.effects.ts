/**
 * @author Arup
 * @description
 * NGRX router-store side effects
 **/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { tap, map } from 'rxjs/operators';

import * as RouterActions from '../actions/router.actions';

@Injectable()
export class RouterEffects {

  /**
   * Router navigate
   */
  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType<RouterActions.Go>(RouterActions.RouterActionTypes.Go),
    map((action: RouterActions.Go) => action.payload),
    tap(({ path, query: queryParams, extras }) => {
        this.router.navigate(path, { queryParams, queryParamsHandling: 'merge', ...extras });
    })
  );

  @Effect({ dispatch: false })
  navigateBack$ = this.actions$.pipe(
    ofType<RouterActions.Back>(RouterActions.RouterActionTypes.Back),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$ = this.actions$.pipe(
    ofType<RouterActions.Forward>(RouterActions.RouterActionTypes.Forward),
    tap(() => this.location.forward())
  );

  /**
   * Reset route by overwriting any existing
   * filters
   */
  @Effect({ dispatch: false })
  reset$ = this.actions$.pipe(
    ofType<RouterActions.Reset>(RouterActions.RouterActionTypes.Reset),
    map((action: RouterActions.Reset) => action.payload),
    tap(({ path, query: queryParams, extras }) =>
      this.router.navigate(path, { queryParams, ...extras })
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
  ) {}
}
