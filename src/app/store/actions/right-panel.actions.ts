import { Action } from '@ngrx/store';

export enum RightPanelActionTypes {
  ChangeSheetType = '[DrawingSheetTypeSelector] Change drawing sheet type selection',
  ChangeCaStatus = '[CaStatusSelector] Change ca status selection',
  ChangePage = '[ItemThumbnail-Paging] Change page of item thumbnails',
  ChangeDivision = '[SpecificationDivisionSelector] Change specification division selection'
}

export class ChangeSheetType implements Action {
  readonly type = RightPanelActionTypes.ChangeSheetType;
  constructor(public payload: {
    selectedSheetType: string
  }) { }
}

export class ChangeCaStatus implements Action {
  readonly type = RightPanelActionTypes.ChangeCaStatus;
  constructor(public payload: {
    selectedCaStatus: string
  }) { }
}

export class ChangePage implements Action {
  readonly type = RightPanelActionTypes.ChangePage;
  constructor(public payload: { currentPage: number }) { }
}

export class ChangeDivision implements Action {
  readonly type = RightPanelActionTypes.ChangeDivision;
  constructor(public payload: {
    selectedDivision: string
  }) { }
}

export type RightPanelActionsUnion =
| ChangeSheetType
| ChangeCaStatus
| ChangePage
| ChangeDivision;
