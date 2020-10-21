import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  tap
} from 'rxjs/operators';
import { of, Observable, EMPTY as empty } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

import * as fromFeature from 'src/app/store/reducers/index';
import * as fromQuery from '../selectors/query.selector';
import * as fromPaging from '../../store/selectors/paging.selector';
import * as fromFilters from '../../store/selectors/filters.selector';

import {
  DataApiActions,
  SpecificationActions,
  DataActions,
  ItemFullsizeActions
} from '../actions';

@Injectable()
export class SpecificationEffects {

  @Effect()
  getSpecificationDivisionFilters$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetSpecificationDivisionFiltersAction>(
      DataActions.DataActionTypes.GetSpecificationDivisionFiltersAction
    ),
    switchMap(() =>
      this.dataService.getSpecificationDivisionFilters().pipe(
        map(response => {
          const filters = response.specification.division;
          return new DataApiActions.GetSpecificationDivisionFiltersSuccess({ specificationDivisionFilters: filters });
        }),
        catchError(error => of(new DataApiActions.GetSpecificationDivisionFiltersError(error)))
      )
    )
  );

  @Effect()
  loadSpecItems$: Observable<any> = this.actions$.pipe(
    ofType<SpecificationActions.LoadSpecificationItems>(
      SpecificationActions.SpecificationItemActionTypes.LoadSpecificationItems
    ),
    map((action) => action),
    withLatestFrom(
      this.store.pipe(select(fromQuery.getSpecItemsQuery))
    ),
    switchMap(([action, specItemsQuery]) => {
      return this.dataService.getSpecificationItems(specItemsQuery).pipe(
        map(specThumbnails => {
          return new DataApiActions.GetSpecificationThumbnailsSuccess({specificationThumbnails: specThumbnails});
        }),
        catchError(error =>
          of(new DataApiActions.GetSpecificationThumbnailsError(error))
        )
      );
    })
  );

  @Effect()
  selectSpecificationItem$: Observable<any> = this.actions$.pipe(
    ofType<SpecificationActions.SelectSpecificationItem>(
      SpecificationActions.SpecificationItemActionTypes.SelectSpecificationItem
    ),
    map((action: SpecificationActions.SelectSpecificationItem) => {
      return action.payload;
    }),
    switchMap(action => {
      if (action.specificationItem.url_endpoint !== '') {
        return this.dataService
          .getSpecificationFileMetadata(action.specificationItem.url_endpoint)
          .pipe(
            map(result => {
              return new DataApiActions.GetSpecificationFileMetadataSuccess({
                specificationItem: result
              });
            }),
            catchError(error =>
              of(new DataApiActions.GetSpecificationFileMetadataError(error))
            )
          );
      } else {
        return empty;
      }
    })
  );

  @Effect()
  nextSpecificationItem$: Observable<any> = this.actions$.pipe(
    ofType<SpecificationActions.NextSpecificationItem>(SpecificationActions.SpecificationItemActionTypes.NextSpecificationItem),
    withLatestFrom(
      this.store.pipe(select(fromPaging.getAdjacentSpecificationItems)),
    ),
    switchMap(([action, adjItem]) => {
      return this.dataService.getSpecificationFileMetadata(adjItem[1].url_endpoint).pipe(
        map((result) =>
          new DataApiActions.GetSpecificationFileMetadataSuccess({ specificationItem: result})
        ),
        catchError(error => of(new DataApiActions.GetSpecificationFileMetadataError(error))),
      );
    })
  );

  @Effect()
  prevSpecificationItem$: Observable<any> = this.actions$.pipe(
    ofType<SpecificationActions.PrevSpecificationItem>(SpecificationActions.SpecificationItemActionTypes.PrevSpecificationItem),
    withLatestFrom(
      this.store.pipe(select(fromPaging.getAdjacentSpecificationItems)),
    ),
    switchMap(([action, adjItem]) => {
      return this.dataService.getSpecificationFileMetadata(adjItem[0].url_endpoint).pipe(
        map((result) =>
          new DataApiActions.GetSpecificationFileMetadataSuccess({ specificationItem: result})
        ),
        catchError(error => of(new DataApiActions.GetSpecificationFileMetadataError(error))),
      );
    }),
  );

  @Effect()
  nextSpecificationItemNextPage$: Observable<any> = this.actions$.pipe(
    ofType<SpecificationActions.NextSpecificationItemNextPage>(
      SpecificationActions.SpecificationItemActionTypes.NextSpecificationItemNextPage
    ),
    withLatestFrom(
      this.store.pipe(select(fromQuery.getSpecificationNextItemNextPageQuery)),
      this.store.pipe(select(fromPaging.getCurrentPage)),
    ),
    switchMap(([action, specificationQuery, page]) => {
    page = Number(page) + 1;
    return this.dataService.getSpecificationItems(specificationQuery).pipe(
      map((specificationThumbnails) =>
        new ItemFullsizeActions.LoadSpecificationThumbnailsNextPageSuccess({
          specificationThumbnails: specificationThumbnails,
          currentPage: page,
        })
      ),
      catchError(error => of(new ItemFullsizeActions.LoadSpecificationThumbnailsNextPageError(error))),
      );
    }),
  );

  @Effect()
  prevSpecificationItemPrevPage$: Observable<any> = this.actions$.pipe(
    ofType<SpecificationActions.PrevSpecificationItemPrevPage>(
      SpecificationActions.SpecificationItemActionTypes.PrevSpecificationItemPrevPage
    ),
    withLatestFrom(
      this.store.pipe(select(fromQuery.getSpecificationPrevItemPrevPageQuery)),
      this.store.pipe(select(fromPaging.getCurrentPage)),
    ),
    switchMap(([action, specificationQuery, page]) => {
    page = Number(page) - 1;
    return this.dataService.getSpecificationItems(specificationQuery).pipe(
      map((specificationThumbnails) =>
        new ItemFullsizeActions.LoadSpecificationThumbnailsPrevPageSuccess({
          specificationThumbnails: specificationThumbnails,
          currentPage: page,
        })
      ),
      catchError(error => of(new ItemFullsizeActions.LoadSpecificationThumbnailsPrevPageError(error))),
      );
    }),
  );

  @Effect({ dispatch: false })
  loadSpecificationThumbnailsNextPage$: Observable<any> = this.actions$.pipe(
    ofType<ItemFullsizeActions.LoadSpecificationThumbnailsNextPageSuccess>
    (ItemFullsizeActions.ItemFullsizeActionTypes.LoadSpecificationThumbnailsNextPageSuccess),
    map((action: ItemFullsizeActions.LoadSpecificationThumbnailsNextPageSuccess) => {
      return action.payload;
    }),
    withLatestFrom(
      this.store.pipe(select(fromFilters.getSelectedDivision))
    ),
    tap( ([action, division])  => {
      this.router.navigate([
        '/dashboard',
        'specification',
        action.currentPage,
        action.specificationThumbnails.data[0].url_endpoint
      ], {queryParams: {division}}
      );
    })
  );

  @Effect({ dispatch: false })
  loadSpecificationThumbnailsPrevPage$: Observable<any> = this.actions$.pipe(
    ofType<ItemFullsizeActions.LoadSpecificationThumbnailsPrevPageSuccess>
    (ItemFullsizeActions.ItemFullsizeActionTypes.LoadSpecificationThumbnailsPrevPageSuccess),
    map((action: ItemFullsizeActions.LoadSpecificationThumbnailsPrevPageSuccess) => {
      return action.payload;
    }),
    withLatestFrom(
      this.store.pipe(select(fromFilters.getSelectedDivision))
    ),
    tap( ([action, division])  => {
      const lastItemIdx = action.specificationThumbnails.data.length - 1;
      this.router.navigate([
        '/dashboard',
        'specification',
        action.currentPage,
        action.specificationThumbnails.data[lastItemIdx].url_endpoint
        ], {queryParams: {division}}
      );
    })
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<fromFeature.State>,
    private router: Router,
  ) {}

}
