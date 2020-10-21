import { Action } from '@ngrx/store';
import { MediaItem, DrawingItem, CaItem } from 'src/app/shared/models/item.model';
import { MediaThumbnails, DrawingThumbnails, CaThumbnails, SpecificationThumbnails } from '../../shared/models/itemthumbnails.model';

export enum ItemFullsizeActionTypes {
  ModalOpen = '[Modal] Open full size image viewing modal',
  PdfViewerOpen = '[PdfViewer] Open full size preview of pdf',
  LoadMediaThumbnailsNextPageSuccess = '[MediaFiles/API] get next page of media thumbnails successfully',
  LoadMediaThumbnailsNextPageError = '[MediaFiles/API] get next page of media files unsuccessfully',
  LoadDrawingThumbnailsNextPageSuccess = '[DrawingFiles/API] get next page of drawing thumbnails successfully',
  LoadDrawingThumbnailsNextPageError = '[DrawingFiles/API] get next page of drawing files unsuccessfully',
  LoadSpecificationThumbnailsNextPageSuccess = '[Specifications/API] get next page of specification thumbnails successfully',
  LoadSpecificationThumbnailsNextPageError = '[Specifications/API] get next page of specification files unsuccessfully',
  LoadCaThumbnailsNextPageSuccess = '[CaFiles/API] get next page of ca thumbnails successfully',
  LoadCaThumbnailsNextPageError = '[CaFiles/API] get next page of ca files unsuccessfully',
  LoadMediaThumbnailsPrevPageSuccess = '[MediaFiles/API] get previous page of media thumbnails successfully',
  LoadMediaThumbnailsPrevPageError = '[MediaFiles/API] get previous page of media files unsuccessfully',
  LoadDrawingThumbnailsPrevPageSuccess = '[DrawingFiles/API] get previous page of drawing thumbnails successfully',
  LoadDrawingThumbnailsPrevPageError = '[DrawingFiles/API] get previous page of drawing files unsuccessfully',
  LoadSpecificationThumbnailsPrevPageSuccess = '[Specifications/API] get previous page of specification thumbnails successfully',
  LoadSpecificationThumbnailsPrevPageError = '[Specifications/API] get previous page of specification files unsuccessfully',
  LoadCaThumbnailsPrevPageSuccess = '[CaFiles/API] get previous page of ca thumbnails successfully',
  LoadCaThumbnailsPrevPageError = '[CaFiles/API] get previous page of ca files unsuccessfully',
  DeleteMarkupFileAction = '[Markups/API] delete markup file',
  DeleteMarkupFileSuccess = '[Markups/API] delete markup file successfully',
  DeleteMarkupFileError = '[Markups/API] delete markup file unsuccessfully',
  UploadMarkupFileSuccess = '[Markups/API] upload markup file successfully'
}

export class ModalOpen implements Action {
  readonly type = ItemFullsizeActionTypes.ModalOpen;
  constructor(public payload: { item: object }) {}
}

export class PdfViewerOpen implements Action {
  readonly type = ItemFullsizeActionTypes.PdfViewerOpen;
  constructor(public payload: { item: object }) {}
}

export class LoadMediaThumbnailsNextPageSuccess implements Action {
  readonly type = ItemFullsizeActionTypes.LoadMediaThumbnailsNextPageSuccess;
  constructor(public payload: {
    mediaThumbnails: MediaThumbnails,
    currentPage: number;
  }) {}
}
export class LoadMediaThumbnailsNextPageError implements Action {
  readonly type = ItemFullsizeActionTypes.LoadMediaThumbnailsNextPageError;
  constructor(public payload: any) {}
}
export class LoadDrawingThumbnailsNextPageSuccess implements Action {
  readonly type = ItemFullsizeActionTypes.LoadDrawingThumbnailsNextPageSuccess;
  constructor(public payload: {
    drawingThumbnails: DrawingThumbnails,
    currentPage: number;
  }) {}
}
export class LoadDrawingThumbnailsNextPageError implements Action {
  readonly type = ItemFullsizeActionTypes.LoadDrawingThumbnailsNextPageError;
  constructor(public payload: any) {}
}
export class LoadSpecificationThumbnailsNextPageSuccess implements Action {
  readonly type = ItemFullsizeActionTypes.LoadSpecificationThumbnailsNextPageSuccess;
  constructor(public payload: {
    specificationThumbnails: SpecificationThumbnails,
    currentPage: number;
  }) {}
}
export class LoadSpecificationThumbnailsNextPageError implements Action {
  readonly type = ItemFullsizeActionTypes.LoadSpecificationThumbnailsNextPageError;
  constructor(public payload: any) {}
}
export class LoadCaThumbnailsNextPageSuccess implements Action {
  readonly type = ItemFullsizeActionTypes.LoadCaThumbnailsNextPageSuccess;
  constructor(public payload: {
    caThumbnails: CaThumbnails,
    currentPage: number;
  }) {}
}
export class LoadCaThumbnailsNextPageError implements Action {
  readonly type = ItemFullsizeActionTypes.LoadCaThumbnailsNextPageError;
  constructor(public payload: any) {}
}
export class LoadMediaThumbnailsPrevPageSuccess implements Action {
  readonly type = ItemFullsizeActionTypes.LoadMediaThumbnailsPrevPageSuccess;
  constructor(public payload: {
    mediaThumbnails: MediaThumbnails,
    currentPage: number;
  }) {}
}
export class LoadMediaThumbnailsPrevPageError implements Action {
  readonly type = ItemFullsizeActionTypes.LoadMediaThumbnailsPrevPageError;
  constructor(public payload: any) {}
}
export class LoadDrawingThumbnailsPrevPageSuccess implements Action {
  readonly type = ItemFullsizeActionTypes.LoadDrawingThumbnailsPrevPageSuccess;
  constructor(public payload: {
    drawingThumbnails: DrawingThumbnails,
    currentPage: number;
  }) {}
}
export class LoadDrawingThumbnailsPrevPageError implements Action {
  readonly type = ItemFullsizeActionTypes.LoadDrawingThumbnailsPrevPageError;
  constructor(public payload: any) {}
}
export class LoadSpecificationThumbnailsPrevPageSuccess implements Action {
  readonly type = ItemFullsizeActionTypes.LoadSpecificationThumbnailsPrevPageSuccess;
  constructor(public payload: {
    specificationThumbnails: SpecificationThumbnails,
    currentPage: number;
  }) {}
}
export class LoadSpecificationThumbnailsPrevPageError implements Action {
  readonly type = ItemFullsizeActionTypes.LoadSpecificationThumbnailsPrevPageError;
  constructor(public payload: any) {}
}
export class LoadCaThumbnailsPrevPageSuccess implements Action {
  readonly type = ItemFullsizeActionTypes.LoadCaThumbnailsPrevPageSuccess;
  constructor(public payload: {
    caThumbnails: CaThumbnails,
    currentPage: number;
  }) {}
}
export class LoadCaThumbnailsPrevPageError implements Action {
  readonly type = ItemFullsizeActionTypes.LoadCaThumbnailsPrevPageError;
  constructor(public payload: any) {}
}
export class DeleteMarkupFileError implements Action {
  readonly type = ItemFullsizeActionTypes.DeleteMarkupFileError;
  constructor(public payload: any) {}
}
export class DeleteMarkupFileSuccess implements Action {
  readonly type = ItemFullsizeActionTypes.DeleteMarkupFileSuccess;
  constructor(public payload: {drawingItem: DrawingItem}) {}
}
export class DeleteMarkupFileAction implements Action {
  readonly type = ItemFullsizeActionTypes.DeleteMarkupFileAction;
  constructor(public payload: {markupUrl: string}) {}
}
export class UploadMarkupFileSuccess implements Action {
  readonly type = ItemFullsizeActionTypes.UploadMarkupFileSuccess;
  constructor(public payload: {drawingItem: DrawingItem}) {}
}
export type ItemFullsizeActionsUnion =
| ModalOpen
| PdfViewerOpen
| LoadMediaThumbnailsNextPageSuccess
| LoadMediaThumbnailsNextPageError
| LoadDrawingThumbnailsNextPageSuccess
| LoadDrawingThumbnailsNextPageError
| LoadSpecificationThumbnailsNextPageSuccess
| LoadSpecificationThumbnailsNextPageError
| LoadCaThumbnailsNextPageSuccess
| LoadCaThumbnailsNextPageError
| LoadMediaThumbnailsPrevPageSuccess
| LoadMediaThumbnailsPrevPageError
| LoadDrawingThumbnailsPrevPageSuccess
| LoadDrawingThumbnailsPrevPageError
| LoadSpecificationThumbnailsPrevPageSuccess
| LoadSpecificationThumbnailsPrevPageError
| LoadCaThumbnailsPrevPageSuccess
| LoadCaThumbnailsPrevPageError
| DeleteMarkupFileSuccess
| DeleteMarkupFileError
| DeleteMarkupFileAction
| UploadMarkupFileSuccess;
