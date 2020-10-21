/** actions related to drawing items */
import { Action } from '@ngrx/store';
import {
  DrawingItem,
  DrawingThumbnailItem
} from '../../shared/models/item.model';

export enum DrawingItemActionTypes {
  DeselectDrawingItem = '[Drawing Item Fullsize Container] Deselect drawing item',
  HoverDrawingItem = '[ItemThumbnail] Hover on drawing item',
  LoadDrawingItems = '[Load Items Guard] Load drawing items',
  NextDrawingItem = '[Drawing Item Fullsize Container] Go to next full size drawing item',
  NextDrawingItemNextPage = '[Drawing Item Fullsize Container] Go to first drawing item on next page',
  PrevDrawingItem = '[Drawing Item Fullsize Container] Go to previous full size drawing item',
  PrevDrawingItemPrevPage = '[Drawing Item Fullsize Container] Go to last drawing item on previous page',
  SelectDrawingItem = '[Item Table Container] Select drawing item',
  SelectDrawingItemType = '[DrawingItemTypeSelector] Change drawing item type selection',
  SelectDrawingSheetType = '[DrawingSheetTypeSelector] Change drawing sheet type selection',
  SelectDrawingNav = '[Drawing Nav] Select drawing nav'
}

/** Deselect drawing item */
export class DeselectDrawingItem implements Action {
  readonly type = DrawingItemActionTypes.DeselectDrawingItem;
  constructor() {}
}
export class HoverDrawingItem implements Action {
  readonly type = DrawingItemActionTypes.HoverDrawingItem;
  constructor(public payload: { hoveredItemSegments: string[] }) {}
}
/** load drawing items */
export class LoadDrawingItems implements Action {
  readonly type = DrawingItemActionTypes.LoadDrawingItems;
}
/** get next drawing item */
export class NextDrawingItem implements Action {
  readonly type = DrawingItemActionTypes.NextDrawingItem;
}
/** get next page of drawing items */
export class NextDrawingItemNextPage implements Action {
  readonly type = DrawingItemActionTypes.NextDrawingItemNextPage;
}
/** get previous drawing item */
export class PrevDrawingItem implements Action {
  readonly type = DrawingItemActionTypes.PrevDrawingItem;
}
/** get previous page of drawing items */
export class PrevDrawingItemPrevPage implements Action {
  readonly type = DrawingItemActionTypes.PrevDrawingItemPrevPage;
}
/** Select drawing item */
export class SelectDrawingItem implements Action {
  readonly type = DrawingItemActionTypes.SelectDrawingItem;
  constructor(public payload: { drawingItem: DrawingThumbnailItem }) {}
}
/** Select drawing item type */
export class SelectDrawingItemType implements Action {
  readonly type = DrawingItemActionTypes.SelectDrawingItemType;
  constructor(public payload: {
    selectedItemType: string
  }) { }
}
/** Select drawing sheet type */
export class SelectDrawingSheetType implements Action {
  readonly type = DrawingItemActionTypes.SelectDrawingSheetType;
  constructor(public payload: {
    selectedSheetType: string
  }) { }
}
/** Select drawing nav */
export class SelectDrawingNav implements Action {
  readonly type = DrawingItemActionTypes.SelectDrawingNav;
}

export type DrawingItemActionsUnion =
  | DeselectDrawingItem
  | LoadDrawingItems
  | HoverDrawingItem
  | NextDrawingItem
  | NextDrawingItemNextPage
  | PrevDrawingItem
  | PrevDrawingItemPrevPage
  | SelectDrawingItem
  | SelectDrawingSheetType
  | SelectDrawingItemType
  | SelectDrawingNav;
