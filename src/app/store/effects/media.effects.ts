// all effects that happen when the user interacts with the site
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, EMPTY as empty } from 'rxjs';
import {
  switchMap,
  map,
  tap,
  catchError,
  withLatestFrom
} from 'rxjs/operators';

import { select, Store } from '@ngrx/store';

import { Router } from '@angular/router';

import * as fromFeature from 'src/app/store/reducers/index';
import * as fromPaging from '../../store/selectors/paging.selector';
import * as fromFilters from '../../store/selectors/filters.selector';
import * as fromQuery from '../../store/selectors/query.selector';

import { MediaTypeFilters } from 'src/app/shared/models/filter.model';

import { DataService } from '../../services/data.service';
import {
  DataApiActions,
  MediaActions,
  ItemFullsizeActions,
  DataActions
} from '../actions';

@Injectable()
export class MediaEffects {

  @Effect()
  getMediaTypeFilters$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetMediaTypeFiltersAction>(
      DataActions.DataActionTypes.GetMediaTypeFiltersAction
    ),
    switchMap(() =>
      this.dataService.getMediaTypeFilters().pipe(
        map(response => {
          const filters = response.medias.type;
          return new DataApiActions.GetMediaTypeFiltersSuccess({ mediaTypeFilters: filters });
        }),
        catchError(error => of(new DataApiActions.GetMediaTypeFiltersError(error)))
      )
    )
  );

  @Effect()
  loadMediaFileMetadata$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetMediaFileMetadataAction>(
      DataActions.DataActionTypes.GetMediaFileMetadataAction
    ),
    map((action: DataActions.GetMediaFileMetadataAction) => {
      return action.payload.url_endpoint;
    }),
    switchMap(urlEndpoint =>
      this.dataService.getMediaFileMetadata(urlEndpoint).pipe(
        map(item => {
          return new DataApiActions.GetMediaFileMetadataSuccess({
            mediaItem: item
          });
        }),
        catchError(error =>
          of(new DataApiActions.GetMediaFileMetadataError(error))
        )
      )
    )
  );

  @Effect()
  loadMediaItems$: Observable<any> = this.actions$.pipe(
    ofType<MediaActions.LoadMediaItems |
      MediaActions.UploadMediaItem>
    (
      MediaActions.MediaItemActionTypes.LoadMediaItems,
      MediaActions.MediaItemActionTypes.UploadMediaItem
    ),
    map((action: MediaActions.LoadMediaItems) => action),
    withLatestFrom(
      this.store.pipe(select(fromQuery.getMediaItemsQuery))
    ),
    switchMap(([action, mediaItemsQuery]) => {
      return this.dataService.getMediaItems(mediaItemsQuery).pipe(
        map(mediaThumbnails => {
          return new DataApiActions.GetMediaThumbnailsSuccess({
            mediaThumbnails: mediaThumbnails
          });
        }),
        catchError(error =>
          of(new DataApiActions.GetMediaThumbnailsError(error))
        )
      );
    })
  );

  @Effect()
  selectMediaItem$: Observable<any> = this.actions$.pipe(
    ofType<MediaActions.SelectMediaItem>(
      MediaActions.MediaItemActionTypes.SelectMediaItem
    ),
    map((action: MediaActions.SelectMediaItem) => {
      return action.payload;
    }),
    withLatestFrom(this.store.pipe(select(fromFilters.getFilteredSegment))),
    switchMap(([action, segment]) => {
      if (action.mediaItem.url_endpoint) {
        return this.dataService.getMediaFileMetadata(action.mediaItem.url_endpoint).pipe(
          map(result => {
            return new DataApiActions.GetMediaFileMetadataSuccess({
              mediaItem: result
            });
          }),
          catchError(error =>
            of(new DataApiActions.GetMediaFileMetadataError(error))
          )
        );
      } else {
        return empty;
      }
    }
    )
  );

  @Effect()
  nextMediaItem$: Observable<any> = this.actions$.pipe(
    ofType<MediaActions.NextMediaItem>(
      MediaActions.MediaItemActionTypes.NextMediaItem
    ),
    withLatestFrom(this.store.pipe(select(fromPaging.getAdjacentMediaItems))),
    switchMap(([action, adjItem]) => {
      return this.dataService
        .getMediaFileMetadata(adjItem[1].url_endpoint)
        .pipe(
          map(
            result =>
              new DataApiActions.GetMediaFileMetadataSuccess({
                mediaItem: result
              })
        ),
          catchError(error =>
            of(new DataApiActions.GetMediaFileMetadataError(error))
          )
      );
    })
  );

  @Effect()
  prevMediaItem$: Observable<any> = this.actions$.pipe(
    ofType<MediaActions.PrevMediaItem>(
      MediaActions.MediaItemActionTypes.PrevMediaItem
    ),
    withLatestFrom(this.store.pipe(select(fromPaging.getAdjacentMediaItems))),
    switchMap(([action, adjItem]) => {
      return this.dataService
        .getMediaFileMetadata(adjItem[0].url_endpoint).pipe(
          map( result => new DataApiActions.GetMediaFileMetadataSuccess({
                mediaItem: result
              })
        ),
          catchError(error =>
            of(new DataApiActions.GetMediaFileMetadataError(error))
          )
      );
    })
  );

  @Effect()
  nextMediaItemNextPage$: Observable<any> = this.actions$.pipe(
    ofType<MediaActions.NextMediaItemNextPage>(
      MediaActions.MediaItemActionTypes.NextMediaItemNextPage
    ),
    withLatestFrom(
      this.store.pipe(select(fromQuery.getMediaNextItemNextPageQuery)),
      this.store.pipe(select(fromPaging.getCurrentPage))
    ),
    switchMap(([action, mediaQuery, page]) => {
    page = Number(page) + 1;
      return this.dataService.getMediaItems(mediaQuery).pipe(
          map(
            mediaThumbnails =>
          new ItemFullsizeActions.LoadMediaThumbnailsNextPageSuccess({
            mediaThumbnails: mediaThumbnails,
                currentPage: page
          })
        ),
          catchError(error =>
            of(new ItemFullsizeActions.LoadMediaThumbnailsNextPageError(error))
          )
        );
    })
  );

  @Effect({ dispatch: false })
  loadMediaThumbnailsNextPage$: Observable<any> = this.actions$.pipe(
    ofType<ItemFullsizeActions.LoadMediaThumbnailsNextPageSuccess>
    (ItemFullsizeActions.ItemFullsizeActionTypes.LoadMediaThumbnailsNextPageSuccess),
    map((action: ItemFullsizeActions.LoadMediaThumbnailsNextPageSuccess) => {
      return action.payload;
    }),
    withLatestFrom(
      this.store.pipe(select(fromFilters.getSelectedItemType))
    ),
    tap( ([action, type])  => {
      this.router.navigate([
        '/dashboard',
        'media',
        action.currentPage,
        action.mediaThumbnails.data[0].url_endpoint
      ], {queryParams: {type}}
      );
    })
  );

  @Effect()
  prevMediaItemPrevPage$: Observable<any> = this.actions$.pipe(
    ofType<MediaActions.PrevMediaItemPrevPage>(
      MediaActions.MediaItemActionTypes.PrevMediaItemPrevPage
    ),
    withLatestFrom(
      this.store.pipe(select(fromQuery.getMediaPrevItemPrevPageQuery)),
      this.store.pipe(select(fromPaging.getCurrentPage))
    ),
    switchMap(([action, mediaQuery, page]) => {
    page = Number(page) - 1;
      return this.dataService.getMediaItems(mediaQuery).pipe(
          map(
            mediaThumbnails =>
          new ItemFullsizeActions.LoadMediaThumbnailsPrevPageSuccess({
            mediaThumbnails: mediaThumbnails,
                currentPage: page
          })
        ),
          catchError(error =>
            of(new ItemFullsizeActions.LoadMediaThumbnailsPrevPageError(error))
          )
        );
    })
  );

  @Effect({ dispatch: false })
  loadMediaThumbnailsPrevPage$: Observable<any> = this.actions$.pipe(
    ofType<ItemFullsizeActions.LoadMediaThumbnailsPrevPageSuccess>
    (ItemFullsizeActions.ItemFullsizeActionTypes.LoadMediaThumbnailsPrevPageSuccess),
    map((action: ItemFullsizeActions.LoadMediaThumbnailsPrevPageSuccess) => {
      return action.payload;
    }),
    withLatestFrom(
      this.store.pipe(select(fromFilters.getSelectedItemType))
    ),
    tap(([action, type]) => {
      const lastItemIdx = action.mediaThumbnails.data.length - 1;
      this.router.navigate([
        '/dashboard',
        'media',
        action.currentPage,
        action.mediaThumbnails.data[lastItemIdx].url_endpoint
        ], {queryParams: {type}}
      );
    })
  );

  @Effect({ dispatch: false })
  changeMediaItemType$ = this.actions$.pipe(
    ofType<MediaActions.SelectMediaItemType>(
      MediaActions.MediaItemActionTypes.SelectMediaItemType
    ),
    map((action) => action),
    tap((action) => {
      this.store.dispatch(
        new DataActions.GetMediaThumbnailsAction()
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
