/** actions related to media items */
import { Action } from '@ngrx/store';
import { MediaItem, MediaThumbnailItem } from '../../shared/models/item.model';

export enum MediaItemActionTypes {
  DeselectMediaItem = '[Media Item Fullsize Container] Deselect Media item',
  LoadMediaItems = '[Load Items Guard] Load media items',
  NextMediaItem = '[Media Item Fullsize Container] Go to next full size media item',
  NextMediaItemNextPage = '[Media Item Fullsize Container] Go to first media item on next page',
  PrevMediaItem = '[Media Item Fullsize Container] Go to previous full size media item',
  PrevMediaItemPrevPage = '[Media Item Fullsize Container] Go to last media item on previous page',
  SelectMediaItem = '[Item Grid Container] Select Media item',
  SelectMediaItemType = '[MediaItemTypeSelector] Change media item type selection',
  MediaItemHover = '[MediaItem] Hover on media item',
  SelectMediaNav = '[Media Nav] Select media nav',
  UploadMediaItem = '[Media Item] Upload new media item'
}

/** Deselect media item */
export class DeselectMediaItem implements Action {
  readonly type = MediaItemActionTypes.DeselectMediaItem;
  constructor() {}
}
/** load media items */
export class LoadMediaItems implements Action {
  readonly type = MediaItemActionTypes.LoadMediaItems;
}

/** get next media item */
export class NextMediaItem implements Action {
  readonly type = MediaItemActionTypes.NextMediaItem;
}

/** get next page of media items */
export class NextMediaItemNextPage implements Action {
  readonly type = MediaItemActionTypes.NextMediaItemNextPage;
}

/** get previous media items */
export class PrevMediaItem implements Action {
  readonly type = MediaItemActionTypes.PrevMediaItem;
}

/** get previous page of media items */
export class PrevMediaItemPrevPage implements Action {
  readonly type = MediaItemActionTypes.PrevMediaItemPrevPage;
}

/** Select media item */
export class SelectMediaItem implements Action {
  readonly type = MediaItemActionTypes.SelectMediaItem;
  constructor(public payload: { mediaItem: MediaThumbnailItem }) {}
}

/** Select media item type */
export class SelectMediaItemType implements Action {
  readonly type = MediaItemActionTypes.SelectMediaItemType;
  constructor(public payload: {
    selectedItemType: string
  }) { }
}

/** Hover on media item */
export class MediaItemHover implements Action {
  readonly type = MediaItemActionTypes.MediaItemHover;
  constructor(public payload: { itemId: string, hoveredItemSegments: string[] }) {}
}

/** Select media nav */
export class SelectMediaNav implements Action {
  readonly type = MediaItemActionTypes.SelectMediaNav;
}

/** Select media nav */
export class UploadMediaItem implements Action {
  readonly type = MediaItemActionTypes.UploadMediaItem;
  constructor(public payload: {
    mediaItem: MediaItem
  }) {}
}

export type MediaItemActionsUnion =
  | DeselectMediaItem
  | LoadMediaItems
  | NextMediaItem
  | NextMediaItemNextPage
  | PrevMediaItem
  | PrevMediaItemPrevPage
  | SelectMediaItem
  | SelectMediaItemType
  | MediaItemHover
  | SelectMediaNav
  | UploadMediaItem;
