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
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import * as fromFeature from 'src/app/store/reducers/index';
import * as fromPaging from '../../store/selectors/paging.selector';
import * as fromQuery from '../../store/selectors/query.selector';
import * as fromFilters from '../../store/selectors/filters.selector';
import { DataService } from '../../services/data.service';
import {
  DataApiActions,
  ItemFullsizeActions,
  DrawingActions,
  DataActions
} from '../actions';

@Injectable()
export class DrawingEffects {

  @Effect()
  getDrawingTypeFilters$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetDrawingTypeFiltersAction>(
      DataActions.DataActionTypes.GetDrawingTypeFiltersAction
    ),
    switchMap(() =>
      this.dataService.getDrawingTypeFilters().pipe(
        map(response => {
          const filters = response.drawings.type;
          return new DataApiActions.GetDrawingTypeFiltersSuccess({ drawingTypeFilters: filters });
        }),
        catchError(error => of(new DataApiActions.GetDrawingTypeFiltersError(error)))
      )
    )
  );

  @Effect()
  getDrawingSheetTypeFilters$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetDrawingSheetTypeFiltersAction>(
      DataActions.DataActionTypes.GetDrawingSheetTypeFiltersAction
    ),
    switchMap(() =>
      this.dataService.getDrawingSheetTypeFilters().pipe(
        map(response => {
          const filters = response.drawings.sheet_type;
          return new DataApiActions.GetDrawingSheetTypeFiltersSuccess({ drawingSheetTypeFilters: filters });
        }),
        catchError(error => of(new DataApiActions.GetDrawingSheetTypeFiltersError(error)))
      )
    )
  );

  @Effect()
  loadDocumentFileMetadata$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetDrawingFileMetadataAction>(
      DataActions.DataActionTypes.GetDrawingFileMetadataAction
    ),
    map((action: DataActions.GetDrawingFileMetadataAction) => {
      return action.payload.url_endpoint;
    }),
    switchMap(urlEndpoint =>
      this.dataService.getDrawingFileMetadata(urlEndpoint).pipe(
        map(item => {
          return new DataApiActions.GetDrawingFileMetadataSuccess({
            drawingItem: item
          });
        }),
        catchError(error =>
          of(new DataApiActions.GetDrawingFileMetadataError(error))
        )
      )
    )
  );

  @Effect()
  selectDrawingItem$: Observable<any> = this.actions$.pipe(
    ofType<DrawingActions.SelectDrawingItem>(
      DrawingActions.DrawingItemActionTypes.SelectDrawingItem
    ),
    map((action: DrawingActions.SelectDrawingItem) => {
      return action.payload;
    }),
    switchMap(action => {
      if (action.drawingItem.url_endpoint !== '') {
        return this.dataService
          .getDrawingFileMetadata(action.drawingItem.url_endpoint)
          .pipe(
            map(result => {
              return new DataApiActions.GetDrawingFileMetadataSuccess({
                drawingItem: result
              });
            }),
            catchError(error =>
              of(new DataApiActions.GetDrawingFileMetadataError(error))
            )
          );
      } else {
        return empty;
      }
    })
  );

  @Effect()
  nextDrawingItem$: Observable<any> = this.actions$.pipe(
    ofType<DrawingActions.NextDrawingItem>(DrawingActions.DrawingItemActionTypes.NextDrawingItem),
    withLatestFrom(
      this.store.pipe(select(fromPaging.getAdjacentDrawingItems)),
    ),
    switchMap(([action, adjItem]) => {
      return this.dataService.getDrawingFileMetadata(adjItem[1].url_endpoint).pipe(
        map((result) =>
          new DataApiActions.GetDrawingFileMetadataSuccess({ drawingItem: result})
        ),
        catchError(error => of(new DataApiActions.GetDrawingFileMetadataError(error))),
      );
    })
  );

  @Effect()
  prevDrawingItem$: Observable<any> = this.actions$.pipe(
    ofType<DrawingActions.PrevDrawingItem>(DrawingActions.DrawingItemActionTypes.PrevDrawingItem),
    withLatestFrom(
      this.store.pipe(select(fromPaging.getAdjacentDrawingItems)),
    ),
    switchMap(([action, adjItem]) => {
      return this.dataService.getDrawingFileMetadata(adjItem[0].url_endpoint).pipe(
        map((result) =>
          new DataApiActions.GetDrawingFileMetadataSuccess({ drawingItem: result})
        ),
        catchError(error => of(new DataApiActions.GetDrawingFileMetadataError(error))),
      );
    }),
  );

  @Effect()
  nextDrawingItemNextPage$: Observable<any> = this.actions$.pipe(
    ofType<DrawingActions.NextDrawingItemNextPage>(DrawingActions.DrawingItemActionTypes.NextDrawingItemNextPage),
    withLatestFrom(
      this.store.pipe(select(fromQuery.getDrawingNextItemNextPageQuery)),
      this.store.pipe(select(fromPaging.getCurrentPage)),
    ),
    switchMap(([action, drawingQuery, page]) => {
    page = Number(page) + 1;
    return this.dataService.getDrawingItems(drawingQuery).pipe(
      map((drawingThumbnails) =>
        new ItemFullsizeActions.LoadDrawingThumbnailsNextPageSuccess({
          drawingThumbnails: drawingThumbnails,
          currentPage: page,
        })
      ),
      catchError(error => of(new ItemFullsizeActions.LoadDrawingThumbnailsNextPageError(error))),
      );
    }),
  );

  @Effect()
  prevDrawingItemPrevPage$: Observable<any> = this.actions$.pipe(
    ofType<DrawingActions.PrevDrawingItemPrevPage>(DrawingActions.DrawingItemActionTypes.PrevDrawingItemPrevPage),
    withLatestFrom(
      this.store.pipe(select(fromQuery.getDrawingPrevItemPrevPageQuery)),
      this.store.pipe(select(fromPaging.getCurrentPage)),
    ),
    switchMap(([action, drawingQuery, page]) => {
    page = Number(page) - 1;
    return this.dataService.getDrawingItems(drawingQuery).pipe(
      map((drawingThumbnails) =>
        new ItemFullsizeActions.LoadDrawingThumbnailsPrevPageSuccess({
          drawingThumbnails: drawingThumbnails,
          currentPage: page,
        })
      ),
      catchError(error => of(new ItemFullsizeActions.LoadDrawingThumbnailsPrevPageError(error))),
      );
    }),
  );

  @Effect({ dispatch: false })
  loadDrawingThumbnailsNextPage$: Observable<any> = this.actions$.pipe(
    ofType<ItemFullsizeActions.LoadDrawingThumbnailsNextPageSuccess>
    (ItemFullsizeActions.ItemFullsizeActionTypes.LoadDrawingThumbnailsNextPageSuccess),
    map((action: ItemFullsizeActions.LoadDrawingThumbnailsNextPageSuccess) => {
      return action.payload;
    }),
    withLatestFrom(
      this.store.pipe(select(fromFilters.getSelectedItemType))
    ),
    tap( ([action, type])  => {
      this.router.navigate([
        '/dashboard',
        'drawing',
        action.currentPage,
        action.drawingThumbnails.data[0].url_endpoint
      ], {queryParams: {type}}
      );
    })
  );

  @Effect({ dispatch: false })
  loadDrawingThumbnailsPrevPage$: Observable<any> = this.actions$.pipe(
    ofType<ItemFullsizeActions.LoadDrawingThumbnailsPrevPageSuccess>
    (ItemFullsizeActions.ItemFullsizeActionTypes.LoadDrawingThumbnailsPrevPageSuccess),
    map((action: ItemFullsizeActions.LoadDrawingThumbnailsPrevPageSuccess) => {
      return action.payload;
    }),
    withLatestFrom(
      this.store.pipe(select(fromFilters.getSelectedItemType))
    ),
    tap( ([action, type])  => {
      const lastItemIdx = action.drawingThumbnails.data.length - 1;
      this.router.navigate([
        '/dashboard',
        'drawing',
        action.currentPage,
        action.drawingThumbnails.data[lastItemIdx].url_endpoint
        ], {queryParams: {type}}
      );
    })
  );

  @Effect()
  deleteMarkupItem$: Observable<any> = this.actions$.pipe(
    ofType<ItemFullsizeActions.DeleteMarkupFileAction>(ItemFullsizeActions.ItemFullsizeActionTypes.DeleteMarkupFileAction),
    map((action: ItemFullsizeActions.DeleteMarkupFileAction) => {
      return action.payload.markupUrl;
    }),
    switchMap( markupUrl =>
      this.dataService.deleteMarkup(markupUrl).pipe(
        map( result => {
          this.snackbar.open('File succesfully deleted.', 'Close', {
            duration: 5000,
          });
          return new ItemFullsizeActions.DeleteMarkupFileSuccess({ drawingItem: result });
        }),
        catchError(error =>
          of(new ItemFullsizeActions.DeleteMarkupFileError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  changeDrawingItemType$ = this.actions$.pipe(
    ofType<DrawingActions.SelectDrawingItemType>(
      DrawingActions.DrawingItemActionTypes.SelectDrawingItemType
    ),
    map((action) => action),
    tap((action) => {
      this.store.dispatch(
        new DataActions.GetDrawingThumbnailsAction()
      );
    })
  );

  @Effect()
  loadDrawingItems$: Observable<any> = this.actions$.pipe(
    ofType<DrawingActions.LoadDrawingItems>(
      DrawingActions.DrawingItemActionTypes.LoadDrawingItems
    ),
    map((action) => action),
    withLatestFrom(
      this.store.pipe(select(fromQuery.getDrawingItemsQuery))
    ),
    switchMap(([action, drawingItemsQuery]) => {
      return this.dataService.getDrawingItems(drawingItemsQuery).pipe(
        map(drawingThumbnails => {
          return new DataApiActions.GetDrawingThumbnailsSuccess({drawingThumbnails});
        }),
        catchError(error =>
          of(new DataApiActions.GetDrawingThumbnailsError(error))
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<fromFeature.State>,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}
}
