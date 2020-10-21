import { Action } from '@ngrx/store';
import { SpecificationThumbnailItem } from 'src/app/shared/models/item.model';

export enum SpecificationItemActionTypes {
  LoadSpecificationItems = '[Load Items Guard] Load specification items',
  SelectSpecificationItem = '[Item Table Container] Select specification item',
  DeselectSpecificationItem = '[Specification Item Fullsize Container] Deselect specification item',
  NextSpecificationItem = '[Specification Item Fullsize Container] Go to next full size specification item',
  NextSpecificationItemNextPage = '[Specification Item Fullsize Container] Go to first specification on next page',
  PrevSpecificationItem = '[Specification Item Fullsize Container] Go to previous full size specification item',
  PrevSpecificationItemPrevPage = '[Specification Item Fullsize Container] Go to last specification on previous page'
}

/** Load specification items */
export class LoadSpecificationItems implements Action {
  readonly type = SpecificationItemActionTypes.LoadSpecificationItems;
}

/** Select specification item */
export class SelectSpecificationItem implements Action {
  readonly type = SpecificationItemActionTypes.SelectSpecificationItem;
  constructor(public payload: { specificationItem: SpecificationThumbnailItem }) {}
}

/** Deselect specification item */
export class DeselectSpecificationItem implements Action {
  readonly type = SpecificationItemActionTypes.DeselectSpecificationItem;
  constructor() {}
}

/** get next specification item */
export class NextSpecificationItem implements Action {
  readonly type = SpecificationItemActionTypes.NextSpecificationItem;
}
/** get next page of specification items */
export class NextSpecificationItemNextPage implements Action {
  readonly type = SpecificationItemActionTypes.NextSpecificationItemNextPage;
}
/** get previous specification item */
export class PrevSpecificationItem implements Action {
  readonly type = SpecificationItemActionTypes.PrevSpecificationItem;
}
/** get previous page of specification items */
export class PrevSpecificationItemPrevPage implements Action {
  readonly type = SpecificationItemActionTypes.PrevSpecificationItemPrevPage;
}

export type SpecificationActionsUnion =
| LoadSpecificationItems
| SelectSpecificationItem
| DeselectSpecificationItem
| NextSpecificationItem
| NextSpecificationItemNextPage
| PrevSpecificationItem
| PrevSpecificationItemPrevPage;
