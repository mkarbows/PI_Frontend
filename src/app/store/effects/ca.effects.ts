// all effects that happen when the user interacts with the site
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, EMPTY as empty } from 'rxjs';
import {
  tap,
  switchMap,
  map,
  catchError,
  withLatestFrom
} from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromFeature from 'src/app/store/reducers/index';
import * as fromPaging from '../../store/selectors/paging.selector';
import * as fromFilters from '../../store/selectors/filters.selector';
import * as fromQuery from '../../store/selectors/query.selector';

import { CaTypeFilters } from 'src/app/shared/models/filter.model';

import { DataService } from '../../services/data.service';
import {
  DataApiActions,
  CaActions,
  ItemFullsizeActions,
  DataActions
} from '../actions';


@Injectable()
export class CaEffects {

  @Effect()
  getCaTypeFilters$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetCaTypeFiltersAction>(
      DataActions.DataActionTypes.GetCaTypeFiltersAction
    ),
    switchMap(() =>
      this.dataService.getCaTypeFilters().pipe(
        map(response => {
          const filters = response.ca.type;
          return new DataApiActions.GetCaTypeFiltersSuccess({ caTypeFilters: filters });
        }),
        catchError(error => of(new DataApiActions.GetCaTypeFiltersError(error)))
      )
    )
  );

  @Effect()
  getCaStatusFilters$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetCaStatusFiltersAction>(
      DataActions.DataActionTypes.GetCaStatusFiltersAction
    ),
    switchMap(() =>
      this.dataService.getCaStatusFilters().pipe(
        map(response => {
          const filters = response.ca.status;
          return new DataApiActions.GetCaStatusFiltersSuccess({ caStatusFilters: filters });
        }),
        catchError(error => of(new DataApiActions.GetCaStatusFiltersError(error)))
      )
    )
  );

  @Effect()
  loadCaFileMetadata$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetCaFileMetadataAction>(
      DataActions.DataActionTypes.GetCaFileMetadataAction
    ),
    map((action: DataActions.GetCaFileMetadataAction) => {
      return action.payload.url_endpoint;
    }),
    switchMap(urlEndpoint =>
      this.dataService.getCaItemMetadata(urlEndpoint).pipe(
        map(item => {
          return new DataApiActions.GetCaFileMetadataSuccess({
            caItem: item
          });
        }),
        catchError(error =>
          of(new DataApiActions.GetCaFileMetadataError(error))
        )
      )
    )
  );

  @Effect()
  selectCaItem$: Observable<any> = this.actions$.pipe(
    ofType<CaActions.SelectCaItem>(
      CaActions.CaItemActionTypes.SelectCaItem,
    ),
    map((action: CaActions.SelectCaItem) => {
      return action.payload;
    }),
    switchMap(action => {
      if (action.caItem.url_endpoint !== '') {
        return this.dataService.getCaItemMetadata(action.caItem.url_endpoint).pipe(
          map(result => {
            return new DataApiActions.GetCaFileMetadataSuccess({
              caItem: result
            });
          }),
          catchError(error =>
            of(new DataApiActions.GetCaFileMetadataError(error))
          )
        );
      } else {
        return empty;
      }
    })
  );

  @Effect()
  nextCaItem$: Observable<any> = this.actions$.pipe(
    ofType<CaActions.NextCaItem>(CaActions.CaItemActionTypes.NextCaItem),
    withLatestFrom(
      this.store.pipe(select(fromPaging.getAdjacentCaItems)),
    ),
    switchMap(([action, adjItem]) => {
      return this.dataService.getCaItemMetadata(adjItem[1].url_endpoint).pipe(
        map((result) =>
          new DataApiActions.GetCaFileMetadataSuccess({ caItem: result})
        ),
        catchError(error => of(new DataApiActions.GetCaFileMetadataError(error))),
      );
    })
  );

  @Effect()
  prevCaItem$: Observable<any> = this.actions$.pipe(
    ofType<CaActions.PrevCaItem>(CaActions.CaItemActionTypes.PrevCaItem),
    withLatestFrom(
      this.store.pipe(select(fromPaging.getAdjacentCaItems)),
    ),
    switchMap(([action, adjItem]) => {
      return this.dataService.getCaItemMetadata(adjItem[0].url_endpoint).pipe(
        map((result) =>
          new DataApiActions.GetCaFileMetadataSuccess({ caItem: result})
        ),
        catchError(error => of(new DataApiActions.GetCaFileMetadataError(error))),
      );
    }),
  );

  @Effect()
  nextCaItemNextPage$: Observable<any> = this.actions$.pipe(
    ofType<CaActions.NextCaItemNextPage>(CaActions.CaItemActionTypes.NextCaItemNextPage),
    withLatestFrom(
      this.store.pipe(select(fromQuery.getCaNextItemNextPageQuery)),
      this.store.pipe(select(fromPaging.getCurrentPage)),
    ),
    switchMap(([action, caQuery, page]) => {
    page = Number(page) + 1;
      return this.dataService.getCaItems(caQuery).pipe(
        map((caThumbnails) =>
          new ItemFullsizeActions.LoadCaThumbnailsNextPageSuccess({
            caThumbnails: caThumbnails,
            currentPage: page,
          })
        ),
        catchError(error => of(new ItemFullsizeActions.LoadCaThumbnailsNextPageError(error))),
        );
    }),
  );

  @Effect({ dispatch: false })
  loadCaThumbnailsNextPage$: Observable<any> = this.actions$.pipe(
    ofType<ItemFullsizeActions.LoadCaThumbnailsNextPageSuccess>
    (ItemFullsizeActions.ItemFullsizeActionTypes.LoadCaThumbnailsNextPageSuccess),
    map((action: ItemFullsizeActions.LoadCaThumbnailsNextPageSuccess) => {
      return action.payload;
    }),
    withLatestFrom(
      this.store.pipe(select(fromFilters.getSelectedItemType))
    ),
    tap( ([action, type])  => {
      this.router.navigate([
        '/dashboard',
        'ca',
        action.currentPage,
        action.caThumbnails.data[0].url_endpoint
        ], {queryParams: {type}}
      );
    })
  );

  @Effect()
  prevCaItemPrevPage$: Observable<any> = this.actions$.pipe(
    ofType<CaActions.PrevCaItemPrevPage>(CaActions.CaItemActionTypes.PrevCaItemPrevPage),
    withLatestFrom(
      this.store.pipe(select(fromQuery.getCaPrevItemPrevPageQuery)),
      this.store.pipe(select(fromPaging.getCurrentPage)),
    ),
    switchMap(([action, caQuery, page]) => {
    page = Number(page) - 1;
      return this.dataService.getCaItems(caQuery).pipe(
        map((caThumbnails) => {
         return new ItemFullsizeActions.LoadCaThumbnailsPrevPageSuccess({
            caThumbnails: caThumbnails,
            currentPage: page,
          });
        }),
        catchError(error => of(new ItemFullsizeActions.LoadCaThumbnailsPrevPageError(error))),
        );
    }),
  );

  @Effect({ dispatch: false })
  loadCaThumbnailsPrevPage$: Observable<any> = this.actions$.pipe(
    ofType<ItemFullsizeActions.LoadCaThumbnailsPrevPageSuccess>
    (ItemFullsizeActions.ItemFullsizeActionTypes.LoadCaThumbnailsPrevPageSuccess),
    map((action: ItemFullsizeActions.LoadCaThumbnailsPrevPageSuccess) => {
      return action.payload;
    }),
    withLatestFrom(
      this.store.pipe(select(fromFilters.getSelectedItemType))
    ),
    tap( ([action, type])  => {
      const lastItemIdx = action.caThumbnails.data.length - 1;
      this.router.navigate([
        '/dashboard',
        'ca',
        action.currentPage,
        action.caThumbnails.data[lastItemIdx].url_endpoint
        ], {queryParams: {type}}
      );
    })
  );

  @Effect({ dispatch: false })
  changeCaItemType$ = this.actions$.pipe(
    ofType<CaActions.SelectCaItemType>(
      CaActions.CaItemActionTypes.SelectCaItemType
    ),
    map((action) => action),
    tap((action) => {
      this.store.dispatch(
        new DataActions.GetCaThumbnailsAction()
      );
    })
  );

  @Effect()
  loadCaItems$: Observable<any> = this.actions$.pipe(
    ofType<CaActions.LoadCaItems>(CaActions.CaItemActionTypes.LoadCaItems),
    map((action: CaActions.LoadCaItems) => action),
    withLatestFrom(
      this.store.pipe(select(fromQuery.getCaItemsQuery))
    ),
    switchMap(([action, caItemsQuery]) => {
      return this.dataService.getCaItems(caItemsQuery).pipe(
        map(caThumbnails => {
          return new DataApiActions.GetCaThumbnailsSuccess({caThumbnails});
        }),
        catchError(error =>
          of(new DataApiActions.GetCaThumbnailsError(error))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<fromFeature.State>,
    private router: Router
  ) {}
}
