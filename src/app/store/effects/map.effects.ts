// all effects that happen when the user interacts with the site
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, EMPTY as empty } from 'rxjs';
import {
  map,
  tap,
  switchMap,
  catchError,
  exhaustMap,
  withLatestFrom
} from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import * as fromFeature from 'src/app/store/reducers/index';
import * as fromFilters from 'src/app/store/selectors/filters.selector';
import * as fromQuery from 'src/app/store/selectors/query.selector';

import { DataService } from '../../services/data.service';
import {
  DataApiActions,
  MapActions,
  DataActions,
  MediaActions
} from '../actions';

import { MapActionTypes } from '../actions/map.actions';
// config
import { PiConfig, GeoDataTypes } from '../../core/app-config';
// services
import { ConfigurationService } from '../../core/configuration.service';

@Injectable()
export class MapEffects {
  config: PiConfig;
  geoDataTypes: GeoDataTypes;

  @Effect()
  getSegments$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetSegmentsAction>(
      DataActions.DataActionTypes.GetSegmentsAction
    ),
    switchMap(() =>
      this.dataService.getGrid().pipe(
        map(response => {
          const segments = response.features;
          return new DataApiActions.GetSegmentsSuccess({ segments });
        }),
        catchError(error => of(new DataApiActions.GetSegmentsError(error)))
      )
    )
  );

  @Effect()
  getLevels$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetLevelsAction>(
      DataActions.DataActionTypes.GetLevelsAction
    ),
    switchMap(() =>
      this.dataService.getLevels().pipe(
        map(response => {
          return new DataApiActions.GetLevelsSuccess(response);
        }),
        catchError(error => of(new DataApiActions.GetLevelsError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  filteredMapSegment$ = this.actions$.pipe(
    ofType<MapActions.FilterMapSegment>(
      MapActions.MapActionTypes.FilterMapSegment
    ),
    map((action: MapActions.FilterMapSegment) => action.payload.filteredSegment),
    withLatestFrom(this.store.pipe(select(fromFilters.getSelectedNavType))),
    tap(([action, navType]) => {
      if (navType === 'media') {
        this.store.dispatch(
          new DataActions.GetMediaThumbnailsAction()
        );
      } else if (navType === 'drawing') {
        this.store.dispatch(
          new DataActions.GetDrawingThumbnailsAction()
        );
      } else if (navType === 'ca')  {
        this.store.dispatch(
          new DataActions.GetCaThumbnailsAction()
        );
      } // add statement for specs
    })
  );

  @Effect()
  loadMediaMapMarkerData$: Observable<any> = this.actions$.pipe(
    ofType<MediaActions.LoadMediaItems>(
      MediaActions.MediaItemActionTypes.LoadMediaItems
    ),
    map((action: MediaActions.LoadMediaItems) => action),
    withLatestFrom(
      this.store.pipe(select(fromQuery.getMediaItemsQuery)),
      this.store.pipe(select(fromQuery.getMapDataQuery))
    ),
    switchMap(([action, mediaItemsQuery, mapDataQuery]) => {
      if (mediaItemsQuery.includes(this.geoDataTypes.geoData2)) {
        return this.dataService
          .getMapData(mapDataQuery)
          .pipe(
            map(
              result =>
                new DataApiActions.GetMapDataSuccess({
                  mapData: result
                })
            ),
            catchError(error =>
              of(new DataApiActions.GetMapDataError(error))
            )
          );
      } else {
        return this.dataService
          .getMapData('&viewer=map&' + this.geoDataTypes.geoData2 + '=empty')
          .pipe(
            map(
              result =>
                new DataApiActions.GetMapDataSuccess({
                  mapData: null
                })
            ),
            catchError(error =>
              of(new DataApiActions.GetMapDataError(error))
            )
          );
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<fromFeature.State>,
    private configService: ConfigurationService
  ) {
    this.config = this.configService.getConfig();
    this.geoDataTypes = this.config.geoDataTypes;
  }

}
