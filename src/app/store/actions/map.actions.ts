import { Action } from '@ngrx/store';
import { MediaThumbnailItem } from 'src/app/shared/models/item.model';

export enum MapActionTypes {
  MapInitialState = '[Map] Reset map to initial page load settings',
  FilterMapSegment = '[Map] Filter map segment',
  MapMarkerHover = '[Map] Hover on map marker',
  MapMarkerSelect = '[Map] Select marker'
}

export class MapInitialState implements Action {
  readonly type = MapActionTypes.MapInitialState;
  constructor(public payload: { init: boolean }) { }
}

export class FilterMapSegment implements Action {
  readonly type = MapActionTypes.FilterMapSegment;
  constructor(public payload: { filteredSegment: string }) { }
}

export class MapMarkerHover implements Action {
  readonly type = MapActionTypes.MapMarkerHover;
  constructor(public payload: { itemId: string }) {}
}

export class MapMarkerSelect implements Action {
  readonly type = MapActionTypes.MapMarkerSelect;
  constructor(public payload: {
    mediaItem: MediaThumbnailItem,
    mapMarkerClicked: boolean
  }) { }
}

export type MapActionsUnion =
| MapInitialState
| FilterMapSegment
| MapMarkerHover
| MapMarkerSelect;
