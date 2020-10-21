import { Action } from '@ngrx/store';

export enum DataActionTypes {
  GetMediaFileMetadataAction = '[Data] Load media file api request',
  GetMediaThumbnailsAction = '[Data] Load media items api request',
  GetDrawingThumbnailsAction = '[Data] Load drawing items api request',
  GetDrawingFileMetadataAction = '[Data] Load drawing file api request',
  GetCaThumbnailsAction = '[Data] Load ca items api request',
  GetCaFileMetadataAction = '[Data] Load ca item api request',
  GetMediaTypeFiltersAction = '[DataInitial] Load media file type filters',
  GetDrawingTypeFiltersAction = '[DataInitial] Load drawing file type filters',
  GetDrawingSheetTypeFiltersAction = '[DataInitial] Load drawing file sheet type filters',
  GetSpecificationDivisionFiltersAction = '[DataInitial] Load specification division filters',
  GetCaTypeFiltersAction = '[DataInitial] Load ca file type filters',
  GetCaStatusFiltersAction = '[DataInitial] Load ca status filters',
  GetTerminalFiltersAction = '[DataInitial] Load terminal filters',
  GetPhaseFiltersAction = '[DataInitial] Load phase filters',
  GetDisciplineFiltersAction = '[DataInitial] Load discipline filters',
  GetSegmentsAction = '[DataInitial] Load grid segments',
  GetLevelsAction = '[DataInitial] Load levels',
  GetSegmentFiltersAction = '[DataInitial] Load segment filters',
}

export class GetMediaFileMetadataAction implements Action {
  readonly type = DataActionTypes.GetMediaFileMetadataAction;
  constructor(public payload: { url_endpoint: string }) { }
}

export class GetDrawingFileMetadataAction implements Action {
  readonly type = DataActionTypes.GetDrawingFileMetadataAction;
  constructor(public payload: { url_endpoint: string }) { }
}

export class GetCaFileMetadataAction implements Action {
  readonly type = DataActionTypes.GetCaFileMetadataAction;
  constructor(public payload: { url_endpoint: string }) { }
}

export class GetMediaThumbnailsAction implements Action {
  readonly type = DataActionTypes.GetMediaThumbnailsAction;
  constructor() { }
}

export class GetDrawingThumbnailsAction implements Action {
  readonly type = DataActionTypes.GetDrawingThumbnailsAction;
  constructor() { }
}

export class GetCaThumbnailsAction implements Action {
  readonly type = DataActionTypes.GetCaThumbnailsAction;
  constructor() { }
}

export class GetMediaTypeFiltersAction implements Action {
  readonly type = DataActionTypes.GetMediaTypeFiltersAction;
  constructor() { }
}

export class GetDrawingTypeFiltersAction implements Action {
  readonly type = DataActionTypes.GetDrawingTypeFiltersAction;
  constructor() { }
}

export class GetDrawingSheetTypeFiltersAction implements Action {
  readonly type = DataActionTypes.GetDrawingSheetTypeFiltersAction;
  constructor() { }
}

export class GetSpecificationDivisionFiltersAction implements Action {
  readonly type = DataActionTypes.GetSpecificationDivisionFiltersAction;
  constructor() {}
}

export class GetCaTypeFiltersAction implements Action {
  readonly type = DataActionTypes.GetCaTypeFiltersAction;
  constructor() { }
}

export class GetCaStatusFiltersAction implements Action {
  readonly type = DataActionTypes.GetCaStatusFiltersAction;
  constructor() { }
}

export class GetTerminalFiltersAction implements Action {
  readonly type = DataActionTypes.GetTerminalFiltersAction;
  constructor() { }
}

export class GetPhaseFiltersAction implements Action {
  readonly type = DataActionTypes.GetPhaseFiltersAction;
  constructor() { }
}

export class GetDisciplineFiltersAction implements Action {
  readonly type = DataActionTypes.GetDisciplineFiltersAction;
  constructor() { }
}

export class GetSegmentsAction implements Action {
  readonly type = DataActionTypes.GetSegmentsAction;
  constructor() { }
}

export class GetLevelsAction implements Action {
  readonly type = DataActionTypes.GetLevelsAction;
  constructor() { }
}

export class GetSegmentFiltersAction implements Action {
  readonly type = DataActionTypes.GetSegmentFiltersAction;
  constructor() { }
}

export type DataActionsUnion =
| GetMediaFileMetadataAction
| GetDrawingFileMetadataAction
| GetSegmentsAction
| GetLevelsAction
| GetMediaThumbnailsAction
| GetDrawingThumbnailsAction
| GetMediaTypeFiltersAction
| GetDrawingTypeFiltersAction
| GetDrawingSheetTypeFiltersAction
| GetSpecificationDivisionFiltersAction
| GetCaTypeFiltersAction
| GetCaStatusFiltersAction
| GetCaThumbnailsAction
| GetCaFileMetadataAction
| GetSegmentFiltersAction;
