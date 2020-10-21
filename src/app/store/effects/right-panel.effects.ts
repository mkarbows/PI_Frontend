// all effects that happen when the user interacts with the site
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom
} from 'rxjs/operators';
import { Action, select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

import * as fromFeature from 'src/app/store/reducers/index';
import * as fromFilters from '../../store/selectors/filters.selector';
import * as fromQuery from '../../store/selectors/query.selector';

import { DataService } from '../../services/data.service';
import {
  DataApiActions,
  ItemFullsizeActions,
  RightPanelActions
} from '../actions';

import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { PdfViewerComponent } from 'src/app/shared/components/pdf-viewer/pdf-viewer.component';

@Injectable()
export class RightPanelEffects {

  @Effect()
  changePage$: Observable<any> = this.actions$.pipe(
    ofType<RightPanelActions.ChangePage>(RightPanelActions.RightPanelActionTypes.ChangePage),
    map((action: RightPanelActions.ChangePage) => action.payload),
    withLatestFrom(
      this.store.pipe(select(fromFilters.getSelectedNavType)),
      this.store.pipe(select(fromQuery.getMediaItemsQuery)),
      this.store.pipe(select(fromQuery.getDrawingItemsQuery)),
      this.store.pipe(select(fromQuery.getSpecItemsQuery)),
      this.store.pipe(select(fromQuery.getCaItemsQuery))
    ),
    switchMap( ([action, selectedNavType, mediaQuery, drawingQuery, specificationQuery, caQuery]): any => {
      if (selectedNavType === 'media') {
        return this.dataService.getMediaItems(mediaQuery).pipe(
          map( mediaThumbnails => new DataApiActions.GetMediaThumbnailsSuccess({ mediaThumbnails })
          ),
          catchError(error =>
            of(new DataApiActions.GetMediaThumbnailsError(error)))
        );
      } else if (selectedNavType === 'drawing') {
        return this.dataService.getDrawingItems(drawingQuery).pipe(
          map( drawingThumbnails => new DataApiActions.GetDrawingThumbnailsSuccess({ drawingThumbnails })
          ),
          catchError(error =>
            of(new DataApiActions.GetDrawingThumbnailsError(error)))
        );
      } else if (selectedNavType === 'specification') {
        return this.dataService.getSpecificationItems(specificationQuery).pipe(
          map( specificationThumbnails => new DataApiActions.GetSpecificationThumbnailsSuccess({ specificationThumbnails })
          ),
          catchError(error =>
            of(new DataApiActions.GetSpecificationThumbnailsError(error)))
        );
      } else if (selectedNavType === 'ca') {
        return this.dataService.getCaItems(caQuery).pipe(
          map( caThumbnails => new DataApiActions.GetCaThumbnailsSuccess({ caThumbnails })
          ),
          catchError(error =>
            of(new DataApiActions.GetCaThumbnailsError(error)))
        );
      }
    })
  );

  @Effect({dispatch: false})
  fullsizeModal$: Observable<Action> = this.actions$.pipe(
    ofType<ItemFullsizeActions.ModalOpen>(
      ItemFullsizeActions.ItemFullsizeActionTypes.ModalOpen
    ),
    map((action: ItemFullsizeActions.ModalOpen) => {
      return action.payload.item;
    }),
    switchMap(item => {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: item
      });
      return dialogRef.afterClosed();
    })
  );

  @Effect({dispatch: false})
  pdfViewer$: Observable<Action> = this.actions$.pipe(
    ofType<ItemFullsizeActions.PdfViewerOpen>(
      ItemFullsizeActions.ItemFullsizeActionTypes.PdfViewerOpen
    ),
    map((action: ItemFullsizeActions.PdfViewerOpen) => {
      return action.payload.item;
    }),
    switchMap(item => {
      const dialogRef = this.dialog.open(PdfViewerComponent, {
        data: item
      });
      return dialogRef.afterClosed();
    })
  );

  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private dataService: DataService,
    private store: Store<fromFeature.State>,
    private router: Router
  ) {}
}
