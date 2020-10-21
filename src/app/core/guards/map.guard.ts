import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, filter, tap, take, switchMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { DataActions } from '../../store/actions';
import * as fromStore from '../../store';

@Injectable({
  providedIn: 'root'
})
export class MapGuard implements CanActivate {
  constructor(private store: Store<fromStore.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    // return Observable stream
    return this.checkStore().pipe(
      // use of to create an observable of true if
      // it was successful
      switchMap(() => of(true)),
      // return false if something went wrong
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    // return an Observable stream from the store
    return this.store.pipe(
      // select the getSegmentsLoaded selector
      // to check if segments have already
      // been loaded into store
      select(fromStore.getSegmentsLoaded),
      // use tap operator to get loaded property
      // from returned observable
      tap(segmentsLoaded => {
        // if the segments haven't been loaded
        // dispatch an action to load them
        if (!segmentsLoaded) {
          this.store.dispatch(new DataActions.GetSegmentsAction());
          this.store.dispatch(new DataActions.GetLevelsAction());
          this.store.dispatch(new DataActions.GetMediaTypeFiltersAction());
          this.store.dispatch(new DataActions.GetDrawingTypeFiltersAction());
          this.store.dispatch(new DataActions.GetDrawingSheetTypeFiltersAction());
          this.store.dispatch(new DataActions.GetSpecificationDivisionFiltersAction());
          this.store.dispatch(new DataActions.GetCaTypeFiltersAction());
          this.store.dispatch(new DataActions.GetCaStatusFiltersAction());
          this.store.dispatch(new DataActions.GetTerminalFiltersAction());
          this.store.dispatch(new DataActions.GetPhaseFiltersAction());
          this.store.dispatch(new DataActions.GetDisciplineFiltersAction());
          this.store.dispatch(new DataActions.GetSegmentFiltersAction());
        }
      }),
      // wait for loaded property (i.e. wait for segments to load)
      // and then continue stream
      filter(segmentsLoaded => segmentsLoaded),
      // take loaded property from filter
      // and call observable complete, which
      // unsubscribes from the stream
      take(1)
    );
  }
}
