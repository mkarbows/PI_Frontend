import { Action } from '@ngrx/store';
import { MediaThumbnails, DrawingThumbnails, SpecificationThumbnails, CaThumbnails } from '../../shared/models/itemthumbnails.model';
import { MediaItem, DrawingItem, CaItem, SpecificationItem } from 'src/app/shared/models/item.model';
import { Level } from '../../shared/models/level.model';
import { Filter } from 'src/app/shared/models/filter.model';

export enum DataApiActionTypes {
  GetMediaFileMetadataSuccess = '[MediaFiles/API] get media file metadata successfully',
  GetMediaFileMetadataError = '[MediaFiles/API] get media file metadata unsuccessfully',
  GetMediaThumbnailsSuccess = '[MediaThumbnails/API] get media items successfully',
  GetMediaThumbnailsError = '[MediaThumbnails/API] get media items unsuccessfully',
  GetDrawingThumbnailsSuccess = '[DrawingThumbnails/API] get drawing items successfully',
  GetDrawingThumbnailsError = '[DrawingThumbnails/API] get drawing items unsuccessfully',
  GetDrawingFileMetadataSuccess = '[DrawingFiles/API] get drawing file metadata successfully',
  GetDrawingFileMetadataError = '[DrawingFiles/API] get drawing file metadata unsuccessfully',
  GetSpecificationThumbnailsSuccess = '[Specifications/API] get specification items successfully',
  GetSpecificationThumbnailsError = '[Specifications/API] get specification items unsuccessfully',
  GetSpecificationFileMetadataSuccess = '[SpecificationFiles/API] get specification file metadata successfully',
  GetSpecificationFileMetadataError = '[SpecificationFiles/API] get specification file metadata unsuccessfully',
  GetCaThumbnailsSuccess = '[CaThumbnails/API] get ca items successfully',
  GetCaThumbnailsError = '[CaThumbnails/API] get ca items unsuccessfully',
  GetCaFileMetadataSuccess = '[CaFiles/API] get ca file metadata successfully',
  GetCaFileMetadataError = '[CaFiles/API] get ca file metadata unsuccessfully',
  GetMediaTypeFiltersSuccess = '[Filters/API] get media file type filters successfully',
  GetMediaTypeFiltersError = '[Filters/API] get media file type filters unsuccessfully',
  GetDrawingTypeFiltersSuccess = '[Filters/API] get drawing file type filters successfully',
  GetDrawingTypeFiltersError = '[Filters/API] get drawing file type filters unsuccessfully',
  GetDrawingSheetTypeFiltersSuccess = '[Filters/API] get drawing file sheet type filters successfully',
  GetDrawingSheetTypeFiltersError = '[Filters/API] get drawing file type sheet filters unsuccessfully',
  GetSpecificationDivisionFiltersSuccess = '[Filters/API] get specification division filters successfully',
  GetSpecificationDivisionFiltersError = '[Filters/API] get specification division filters unsuccessfully',
  GetCaTypeFiltersSuccess = '[Filters/API] get ca item type filters successfully',
  GetCaTypeFiltersError = '[Filters/API] get ca item type filters unsuccessfully',
  GetCaStatusFiltersSuccess = '[Filters/API] get ca item status filters successfully',
  GetCaStatusFiltersError = '[Filters/API] get ca item status filters unsuccessfully',
  GetTerminalFiltersSuccess = '[Filters/API] get terminal filters successfully',
  GetTerminalFiltersError = '[Filters/API] get terminal filters unsuccessfully',
  GetPhaseFiltersSuccess = '[Filters/API] get phase filters successfully',
  GetPhaseFiltersError = '[Filters/API] get phase filters unsuccessfully',
  GetDisciplineFiltersSuccess = '[Filters/API] get discipline filters successfully',
  GetDisciplineFiltersError = '[Filters/API] get discipline filters unsuccessfully',
  GetSegmentFiltersSuccess = '[Filters/API] get segment filters successfully',
  GetSegmentFiltersError = '[Filters/API] get segment filters unsuccessfully',
  GetSegmentsSuccess = '[SegmentGrid/API] Load grid segments successfully',
  GetSegmentsError = '[SegmentGrid/API] Load grid segments unsuccessfully',
  GetMapDataSuccess = '[MapData/API] Load project files within a segment successfully',
  GetMapDataError = '[MapData/API] Load project files within a segment unsuccessfully',
  GetPaginatedSegmentMediaItemsSuccess = '[SegmentPaging/API] Load paginated media items within a segment successfully',
  GetPaginatedSegmentDrawingItemsSuccess = '[SegmentPaging/API] Load paginated drawing items within a segment successfully',
  GetPaginatedSegmentCaItemsSuccess = '[SegmentPaging/API] Load paginated ca items within a segment successfully',
  GetPaginatedSegmentMediaItemsError = '[SegmentPaging/API] Load paginated media items within a segment unsuccessfully',
  GetPaginatedSegmentDrawingItemsError = '[SegmentPaging/API] Load paginated drawing items within a segment unsuccessfully',
  GetPaginatedSegmentCaItemsError = '[SegmentPaging/API] Load paginated ca items within a segment unsuccessfully',
  GetLevelsSuccess = '[Levels/API] get levels successfully',
  GetLevelsError = '[Levels/API] get levels unsuccessfully'
}

export class GetMediaFileMetadataSuccess implements Action {
  readonly type = DataApiActionTypes.GetMediaFileMetadataSuccess;
  constructor(public payload: { mediaItem: MediaItem }) { }
}

export class GetMediaFileMetadataError implements Action {
  readonly type = DataApiActionTypes.GetMediaFileMetadataError;
  constructor(public payload: any) { }
}

export class GetMediaThumbnailsSuccess implements Action {
  readonly type = DataApiActionTypes.GetMediaThumbnailsSuccess;
  constructor(public payload: { mediaThumbnails: MediaThumbnails }) { }
}

export class GetMediaThumbnailsError implements Action {
  readonly type = DataApiActionTypes.GetMediaThumbnailsError;
  constructor(public payload: any) { }
}

export class GetDrawingThumbnailsSuccess implements Action {
  readonly type = DataApiActionTypes.GetDrawingThumbnailsSuccess;
  constructor(public payload: { drawingThumbnails: DrawingThumbnails }) { }
}

export class GetDrawingThumbnailsError implements Action {
  readonly type = DataApiActionTypes.GetDrawingThumbnailsError;
  constructor(public payload: any) { }
}

export class GetDrawingFileMetadataSuccess implements Action {
  readonly type = DataApiActionTypes.GetDrawingFileMetadataSuccess;
  constructor(public payload: { drawingItem: DrawingItem }) { }
}

export class GetDrawingFileMetadataError implements Action {
  readonly type = DataApiActionTypes.GetDrawingFileMetadataError;
  constructor(public payload: any) { }
}

export class GetSpecificationThumbnailsSuccess implements Action {
  readonly type = DataApiActionTypes.GetSpecificationThumbnailsSuccess;
  constructor(public payload: { specificationThumbnails: SpecificationThumbnails }) {}
}

export class GetSpecificationThumbnailsError implements Action {
  readonly type = DataApiActionTypes.GetSpecificationThumbnailsError;
  constructor(public payload: any) { }
}

export class GetSpecificationFileMetadataSuccess implements Action {
  readonly type = DataApiActionTypes.GetSpecificationFileMetadataSuccess;
  constructor(public payload: { specificationItem: SpecificationItem }) { }
}

export class GetSpecificationFileMetadataError implements Action {
  readonly type = DataApiActionTypes.GetSpecificationFileMetadataError;
  constructor(public payload: any) { }
}

export class GetCaThumbnailsSuccess implements Action {
  readonly type = DataApiActionTypes.GetCaThumbnailsSuccess;
  constructor(public payload: { caThumbnails: CaThumbnails }) { }
}

export class GetCaThumbnailsError implements Action {
  readonly type = DataApiActionTypes.GetCaThumbnailsError;
  constructor(public payload: any) { }
}

export class GetCaFileMetadataSuccess implements Action {
  readonly type = DataApiActionTypes.GetCaFileMetadataSuccess;
  constructor(public payload: { caItem: CaItem }) { }
}

export class GetCaFileMetadataError implements Action {
  readonly type = DataApiActionTypes.GetCaFileMetadataError;
  constructor(public payload: any) { }
}

export class GetMediaTypeFiltersSuccess implements Action {
  readonly type = DataApiActionTypes.GetMediaTypeFiltersSuccess;
  constructor(public payload: { mediaTypeFilters: Filter[]}) { }
}

export class GetMediaTypeFiltersError implements Action {
  readonly type = DataApiActionTypes.GetMediaTypeFiltersError;
  constructor(public payload: any) { }
}

export class GetDrawingTypeFiltersSuccess implements Action {
  readonly type = DataApiActionTypes.GetDrawingTypeFiltersSuccess;
  constructor(public payload: { drawingTypeFilters: Filter[] }) { }
}

export class GetDrawingTypeFiltersError implements Action {
  readonly type = DataApiActionTypes.GetDrawingTypeFiltersError;
  constructor(public payload: any) { }
}

export class GetDrawingSheetTypeFiltersSuccess implements Action {
  readonly type = DataApiActionTypes.GetDrawingSheetTypeFiltersSuccess;
  constructor(public payload: { drawingSheetTypeFilters: Filter[] }) { }
}

export class GetDrawingSheetTypeFiltersError implements Action {
  readonly type = DataApiActionTypes.GetDrawingSheetTypeFiltersError;
  constructor(public payload: any) { }
}

export class GetSpecificationDivisionFiltersSuccess implements Action {
  readonly type = DataApiActionTypes.GetSpecificationDivisionFiltersSuccess;
  constructor(public payload: { specificationDivisionFilters: Filter[] }) {}
}

export class GetSpecificationDivisionFiltersError implements Action {
  readonly type = DataApiActionTypes.GetSpecificationDivisionFiltersError;
  constructor(public payload: any) { }
}

export class GetCaTypeFiltersSuccess implements Action {
  readonly type = DataApiActionTypes.GetCaTypeFiltersSuccess;
  constructor(public payload: { caTypeFilters: Filter[] }) { }
}

export class GetCaTypeFiltersError implements Action {
  readonly type = DataApiActionTypes.GetCaTypeFiltersError;
  constructor(public payload: any) { }
}

export class GetCaStatusFiltersSuccess implements Action {
  readonly type = DataApiActionTypes.GetCaStatusFiltersSuccess;
  constructor(public payload: { caStatusFilters: Filter[] }) { }
}

export class GetCaStatusFiltersError implements Action {
  readonly type = DataApiActionTypes.GetCaStatusFiltersError;
  constructor(public payload: any) { }
}

export class GetTerminalFiltersSuccess implements Action {
  readonly type = DataApiActionTypes.GetTerminalFiltersSuccess;
  constructor(public payload: { terminalFilters: Filter[] }) { }
}

export class GetTerminalFiltersError implements Action {
  readonly type = DataApiActionTypes.GetTerminalFiltersError;
  constructor(public payload: any) { }
}

export class GetPhaseFiltersSuccess implements Action {
  readonly type = DataApiActionTypes.GetPhaseFiltersSuccess;
  constructor(public payload: { phaseFilters: Filter[] }) { }
}

export class GetPhaseFiltersError implements Action {
  readonly type = DataApiActionTypes.GetPhaseFiltersError;
  constructor(public payload: any) { }
}

export class GetDisciplineFiltersSuccess implements Action {
  readonly type = DataApiActionTypes.GetDisciplineFiltersSuccess;
  constructor(public payload: { disciplineFilters: Filter[] }) { }
}

export class GetDisciplineFiltersError implements Action {
  readonly type = DataApiActionTypes.GetDisciplineFiltersError;
  constructor(public payload: any) { }
}

export class GetSegmentsSuccess implements Action {
  readonly type = DataApiActionTypes.GetSegmentsSuccess;
  constructor(public payload: { segments: any }) {
  }
}

export class GetSegmentsError implements Action {
  readonly type = DataApiActionTypes.GetSegmentsError;
  constructor(public payload: any) { }
}

export class GetSegmentFiltersSuccess implements Action {
  readonly type = DataApiActionTypes.GetSegmentFiltersSuccess;
  constructor(public payload: { segmentFilters: Filter[] }) { }
}

export class GetSegmentFiltersError implements Action {
  readonly type = DataApiActionTypes.GetSegmentFiltersError;
  constructor(public payload: any) { }
}

export class GetMapDataSuccess implements Action {
  readonly type = DataApiActionTypes.GetMapDataSuccess;
  constructor(public payload: {
    mapData: any
  }) {}
}

export class GetMapDataError implements Action {
  readonly type = DataApiActionTypes.GetMapDataError;
  constructor(public payload: string) { }
}

export class GetPaginatedSegmentMediaItemsSuccess implements Action {
  readonly type = DataApiActionTypes.GetPaginatedSegmentMediaItemsSuccess;
  constructor(public payload: {
    mediaThumbnails: MediaThumbnails,
    currentPage: number
  }) {}
}

export class GetPaginatedSegmentDrawingItemsSuccess implements Action {
  readonly type = DataApiActionTypes.GetPaginatedSegmentDrawingItemsSuccess;
  constructor(public payload: {
    drawingThumbnails: DrawingThumbnails,
    currentPage: number
  }) {}
}

export class GetPaginatedSegmentCaItemsSuccess implements Action {
  readonly type = DataApiActionTypes.GetPaginatedSegmentCaItemsSuccess;
  constructor(public payload: {
    caThumbnails: CaThumbnails,
    currentPage: number
  }) {}
}

export class GetPaginatedSegmentMediaItemsError implements Action {
  readonly type = DataApiActionTypes.GetPaginatedSegmentMediaItemsError;
  constructor(public payload: string) { }
}

export class GetPaginatedSegmentDrawingItemsError implements Action {
  readonly type = DataApiActionTypes.GetPaginatedSegmentDrawingItemsError;
  constructor(public payload: string) { }
}

export class GetPaginatedSegmentCaItemsError implements Action {
  readonly type = DataApiActionTypes.GetPaginatedSegmentCaItemsError;
  constructor(public payload: string) { }
}

export class GetLevelsSuccess implements Action {
  readonly type = DataApiActionTypes.GetLevelsSuccess;
  constructor(public payload:
      Level[]
  ) {}
}

export class GetLevelsError implements Action {
  readonly type = DataApiActionTypes.GetLevelsError;
  constructor(public payload: string) { }
}

export type DataApiActionsUnion =
| GetMediaFileMetadataSuccess
| GetMediaFileMetadataError
| GetMediaThumbnailsSuccess
| GetMediaThumbnailsError
| GetDrawingThumbnailsSuccess
| GetDrawingThumbnailsError
| GetDrawingFileMetadataSuccess
| GetDrawingFileMetadataError
| GetSpecificationThumbnailsSuccess
| GetSpecificationThumbnailsError
| GetSpecificationFileMetadataSuccess
| GetSpecificationFileMetadataError
| GetCaThumbnailsSuccess
| GetCaThumbnailsError
| GetCaFileMetadataSuccess
| GetCaFileMetadataError
| GetMediaTypeFiltersSuccess
| GetMediaTypeFiltersError
| GetDrawingTypeFiltersSuccess
| GetDrawingTypeFiltersError
| GetSpecificationDivisionFiltersSuccess
| GetSpecificationDivisionFiltersError
| GetDrawingSheetTypeFiltersSuccess
| GetDrawingSheetTypeFiltersError
| GetCaTypeFiltersSuccess
| GetCaTypeFiltersError
| GetCaStatusFiltersSuccess
| GetCaStatusFiltersError
| GetTerminalFiltersSuccess
| GetTerminalFiltersError
| GetPhaseFiltersSuccess
| GetPhaseFiltersError
| GetDisciplineFiltersSuccess
| GetDisciplineFiltersError
| GetSegmentFiltersSuccess
| GetSegmentFiltersError
| GetSegmentsSuccess
| GetSegmentsError
| GetMapDataSuccess
| GetMapDataError
| GetPaginatedSegmentMediaItemsSuccess
| GetPaginatedSegmentDrawingItemsSuccess
| GetPaginatedSegmentCaItemsSuccess
| GetPaginatedSegmentMediaItemsError
| GetPaginatedSegmentDrawingItemsError
| GetPaginatedSegmentMediaItemsError
| GetPaginatedSegmentCaItemsError
| GetLevelsSuccess
| GetLevelsError;
