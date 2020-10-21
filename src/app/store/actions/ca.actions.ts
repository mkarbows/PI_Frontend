import { Action } from '@ngrx/store';

import {
  CaItem,
  CaThumbnailItem
} from '../../shared/models/item.model';

export enum CaItemActionTypes {
  DeselectCaItem = '[Ca Item Fullsize Container] Deselect ca item',
  LoadCaItems = '[Load Items Guard] Load Ca items',
  HoverCaItem = '[Ca Item Table Container] Hover on ca item',
  NextCaItem = '[Ca Item Fullsize Container] Go to next full size ca item',
  NextCaItemNextPage = '[Ca Item Fullsize Container] Go to first ca item on next page',
  PrevCaItem = '[Ca Item Fullsize Container] Go to previous full size ca item',
  PrevCaItemPrevPage = '[Ca Item Fullsize Container] Go to last ca item on previous page',
  SelectCaItem = '[Item Table Container] Select ca item',
  SelectCaItemType = '[CaItemTypeSelector] Change ca item type selection',
  SelectCaNav = '[Ca Nav] Select ca nav'
}

/** Deselect ca item */
export class DeselectCaItem implements Action {
  readonly type = CaItemActionTypes.DeselectCaItem;
  constructor() {}
}
/** load ca items */
export class LoadCaItems implements Action {
  readonly type = CaItemActionTypes.LoadCaItems;
}

/** hover ca item */
export class HoverCaItem implements Action {
  readonly type = CaItemActionTypes.HoverCaItem;
  constructor(public payload: { hoveredItemSegments: string[] }) {}
}

/** get next ca item */
export class NextCaItem implements Action {
  readonly type = CaItemActionTypes.NextCaItem;
}
/** get next page of ca items */
export class NextCaItemNextPage implements Action {
  readonly type = CaItemActionTypes.NextCaItemNextPage;
}
/** get previous ca item */
export class PrevCaItem implements Action {
  readonly type = CaItemActionTypes.PrevCaItem;
}
/** get previous page of ca items */
export class PrevCaItemPrevPage implements Action {
  readonly type = CaItemActionTypes.PrevCaItemPrevPage;
}
/** Select ca item */
export class SelectCaItem implements Action {
  readonly type = CaItemActionTypes.SelectCaItem;
  constructor(public payload: { caItem: CaThumbnailItem }) {}
}

export class SelectCaItemType implements Action {
  readonly type = CaItemActionTypes.SelectCaItemType;
  constructor(public payload: {
    selectedItemType: string
  }) { }
}

/** Select ca nav */
export class SelectCaNav implements Action {
  readonly type = CaItemActionTypes.SelectCaNav;
}

export type CaItemActionsUnion =
  | DeselectCaItem
  | LoadCaItems
  | HoverCaItem
  | NextCaItem
  | NextCaItemNextPage
  | PrevCaItem
  | PrevCaItemPrevPage
  | SelectCaItem
  | SelectCaItemType
  | SelectCaNav;
