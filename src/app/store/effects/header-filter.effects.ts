// all effects that happen when the user interacts with the site
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  exhaustMap,
  withLatestFrom
} from 'rxjs/operators';
import { Action, select, Store } from '@ngrx/store';

import * as fromFeature from 'src/app/store/reducers/index';
import * as fromFilters from 'src/app/store/selectors/filters.selector';
import * as fromQuery from 'src/app/store/selectors/query.selector';

import { DataService } from '../../services/data.service';
import {
  HeaderFilterActions,
  DataApiActions,
  DataActions
} from '../actions';

import { PiConfig, GeoDataTypes } from 'src/app/core/app-config';
import { ConfigurationService } from 'src/app/core/configuration.service';

@Injectable()
export class HeaderFilterEffects {
  config: PiConfig;
  geoDataTypes: GeoDataTypes;

  @Effect()
  resetFilters$: Observable<Action> = this.actions$.pipe(
    ofType<HeaderFilterActions.ResetFilters>(
      HeaderFilterActions.HeaderFilterActionTypes.ResetFilters
    ),
    map((action: HeaderFilterActions.ResetFilters) => action),
    withLatestFrom(
      this.store.pipe(select(fromFilters.getSelectedNavType)),
      this.store.pipe(select(fromQuery.getThumbnailItemsResetQuery))
    ),
    exhaustMap(([action, navType, resetQuery]) => {
      if (navType === 'media') {
        return this.dataService.getMediaItems(resetQuery).pipe(
          map(
            result =>
              new HeaderFilterActions.ResetMediaFiltersSuccess({
                mediaThumbnails: result
              })
          ),
          catchError(error =>
            of(new HeaderFilterActions.ResetMediaFiltersError(error))
          )
        );
      } else if (navType === 'drawing') {
        return this.dataService.getDrawingItems(resetQuery).pipe(
          map(
            result =>
              new HeaderFilterActions.ResetDrawingFiltersSuccess({
                drawingThumbnails: result
              })
          ),
          catchError(error =>
            of(new HeaderFilterActions.ResetDrawingFiltersError(error))
          )
        );
      } else if (navType === 'ca') {
        return this.dataService.getCaItems(resetQuery).pipe(
          map(
            result =>
              new HeaderFilterActions.ResetCaFiltersSuccess({
                caThumbnails: result
              })
          ),
          catchError(error =>
            of(new HeaderFilterActions.ResetCaFiltersError(error))
          )
        );
      }
    })
  );

  @Effect()
  getTerminalFilters$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetTerminalFiltersAction>(
      DataActions.DataActionTypes.GetTerminalFiltersAction
    ),
    switchMap(() =>
      this.dataService.getTerminalFilters().pipe(
        map(response => {
          const filters = response.medias[this.geoDataTypes.geoData1];
          return new DataApiActions.GetTerminalFiltersSuccess({ terminalFilters: filters });
        }),
        catchError(error => of(new DataApiActions.GetTerminalFiltersError(error)))
      )
    )
  );

  @Effect()
  getPhaseFilters$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetPhaseFiltersAction>(
      DataActions.DataActionTypes.GetPhaseFiltersAction
    ),
    switchMap(() =>
      this.dataService.getPhaseFilters().pipe(
        map(response => {
          const filters = response.medias.phase;
          return new DataApiActions.GetPhaseFiltersSuccess({ phaseFilters: filters });
        }),
        catchError(error => of(new DataApiActions.GetPhaseFiltersError(error)))
      )
    )
  );

  @Effect()
  getDisciplineFilters$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetDisciplineFiltersAction>(
      DataActions.DataActionTypes.GetDisciplineFiltersAction
    ),
    switchMap(() =>
      this.dataService.getDisciplineFilters().pipe(
        map(response => {
          const filters = response.medias.discipline;
          return new DataApiActions.GetDisciplineFiltersSuccess({ disciplineFilters: filters });
        }),
        catchError(error => of(new DataApiActions.GetDisciplineFiltersError(error)))
      )
    )
  );

  @Effect()
  getSegmentFilters$: Observable<any> = this.actions$.pipe(
    ofType<DataActions.GetSegmentFiltersAction>(
      DataActions.DataActionTypes.GetSegmentFiltersAction
    ),
    switchMap(() =>
      this.dataService.getSegmentFilters().pipe(
        map(response => {
          const filters = response.medias[this.geoDataTypes.geoData2];
          return new DataApiActions.GetSegmentFiltersSuccess({ segmentFilters: filters });
        }),
        catchError(error => of(new DataApiActions.GetSegmentFiltersError(error)))
      )
    )
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
