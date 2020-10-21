import { Action } from '@ngrx/store';
import { MediaThumbnails, DrawingThumbnails, CaThumbnails } from '../../shared/models/itemthumbnails.model';

export enum HeaderFilterActionTypes {
  ResetFilters = '[HeaderFilter] Reset filters to initial page load settings',
  ResetMediaFiltersSuccess = '[HeaderFilter/API] Completed reset of filters on media nav',
  ResetDrawingFiltersSuccess = '[HeaderFilter/API] Completed reset of filters on drawing nav',
  ResetCaFiltersSuccess = '[HeaderFilter/API] Completed reset of filters on ca nav',
  ResetMediaFiltersError = '[HeaderFilter/API] Completed reset of filters on media nav unsuccessfully',
  ResetDrawingFiltersError = '[HeaderFilter/API] Completed reset of filters on drawing nav unsuccessfully',
  ResetCaFiltersError = '[HeaderFilter/API] Completed reset of filters on ca nav unsuccessfully',
  HeaderFilterMapInitialState = '[HeaderFilter] Reset map to initial page load settings',
  ZoomToSelection = '[HeaderFilter] Change zoom to selection value',
}

export class ResetFilters implements Action {
  readonly type = HeaderFilterActionTypes.ResetFilters;
}

export class ResetMediaFiltersSuccess implements Action {
  readonly type = HeaderFilterActionTypes.ResetMediaFiltersSuccess;
  constructor(public payload: {
    mediaThumbnails: MediaThumbnails,
   }) { }
}

export class ResetDrawingFiltersSuccess implements Action {
  readonly type = HeaderFilterActionTypes.ResetDrawingFiltersSuccess;
  constructor(public payload: {
    drawingThumbnails: DrawingThumbnails,
   }) { }
}

export class ResetCaFiltersSuccess implements Action {
  readonly type = HeaderFilterActionTypes.ResetCaFiltersSuccess;
  constructor(public payload: {
    caThumbnails: CaThumbnails,
   }) { }
}

export class ResetMediaFiltersError implements Action {
  readonly type = HeaderFilterActionTypes.ResetMediaFiltersError;
  constructor(public payload: any) { }
}

export class ResetDrawingFiltersError implements Action {
  readonly type = HeaderFilterActionTypes.ResetDrawingFiltersError;
  constructor(public payload: any) { }
}

export class ResetCaFiltersError implements Action {
  readonly type = HeaderFilterActionTypes.ResetCaFiltersError;
  constructor(public payload: any) { }
}

export class HeaderFilterMapInitialState implements Action {
  readonly type = HeaderFilterActionTypes.HeaderFilterMapInitialState;
  constructor(public payload: { init: boolean }) { }
}

export class ZoomToSelection implements Action {
  readonly type = HeaderFilterActionTypes.ZoomToSelection;
  constructor(public payload: { zoomToSelection: boolean }) { }
}

export type HeaderFilterActionsUnion =
| ResetFilters
| ResetMediaFiltersSuccess
| ResetDrawingFiltersSuccess
| ResetCaFiltersSuccess
| ResetMediaFiltersError
| ResetDrawingFiltersError
| ResetCaFiltersError
| HeaderFilterMapInitialState
| ZoomToSelection;
