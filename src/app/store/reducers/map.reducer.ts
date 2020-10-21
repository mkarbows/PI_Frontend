import { MapData } from '../../shared/models/mapdata.model';

import {
  DataApiActions,
  MapActions,
  HeaderFilterActions,
  CaActions,
  DrawingActions,
  MediaActions
} from '../actions';

export const mapFeatureKey = 'map';

export interface State {
  currentItemSegments: string[];
  hoverItemId: string;
  hoveredItemSegments: string[];
  mapData: MapData;
  mapInitialState: boolean;
  segments: any;
  segmentsLoaded: boolean;
  zoomToSelection: boolean;
  mapMarkerClicked: boolean;
}

export const initialState: State = {
  currentItemSegments: [],
  hoverItemId: null,
  hoveredItemSegments: [],
  mapData: null,
  mapInitialState: true,
  segments: undefined,
  segmentsLoaded: false,
  zoomToSelection: false,
  mapMarkerClicked: false
};

export function reducer(
  state = initialState,
  action:
    | DataApiActions.DataApiActionsUnion
    | MapActions.MapActionsUnion
    | HeaderFilterActions.HeaderFilterActionsUnion
    | MediaActions.MediaItemActionsUnion
    | DrawingActions.DrawingItemActionsUnion
    | CaActions.CaItemActionsUnion
): State {
  switch (action.type) {
    case DataApiActions.DataApiActionTypes.GetSegmentsSuccess: {
      return {
        ...state,
        segments: action.payload.segments,
        segmentsLoaded: true
      };
    }
    case HeaderFilterActions.HeaderFilterActionTypes.ResetCaFiltersSuccess:
    case HeaderFilterActions.HeaderFilterActionTypes.ResetDrawingFiltersSuccess:
    case HeaderFilterActions.HeaderFilterActionTypes.ResetMediaFiltersSuccess: {
      return {
        ...state,
        mapData: null,
        currentItemSegments: [],
        hoveredItemSegments: [],
      };
    }
    case HeaderFilterActions.HeaderFilterActionTypes.ZoomToSelection: {
      return {
        ...state,
        zoomToSelection: action.payload.zoomToSelection
      };
    }
    case DataApiActions.DataApiActionTypes.GetMapDataSuccess: {
      return {
        ...state,
        mapData: action.payload.mapData
      };
    }
    case DataApiActions.DataApiActionTypes.GetMapDataError: {
      return {
        ...state,
      };
    }
    case CaActions.CaItemActionTypes.SelectCaItem:
    case DrawingActions.DrawingItemActionTypes.SelectDrawingItem:
    case MediaActions.MediaItemActionTypes.SelectMediaItem: {
      return {
        ...state,
        hoverItemId: null
      };
    }
    case DrawingActions.DrawingItemActionTypes.DeselectDrawingItem:
    case CaActions.CaItemActionTypes.DeselectCaItem:
    case MediaActions.MediaItemActionTypes.DeselectMediaItem: {
      return {
        ...state,
        hoveredItemSegments: [],
        currentItemSegments: []
      };
    }
    case MapActions.MapActionTypes.MapInitialState: {
      return {
        ...state,
        mapInitialState: action.payload.init
      };
    }
    case HeaderFilterActions.HeaderFilterActionTypes
      .HeaderFilterMapInitialState: {
      return {
        ...state,
        mapInitialState: action.payload.init,
        mapData: null,
      };
    }
    case MapActions.MapActionTypes.MapMarkerHover: {
      return {
        ...state,
        hoverItemId: action.payload.itemId
      };
    }
    case MediaActions.MediaItemActionTypes.MediaItemHover: {
      return {
        ...state,
        hoverItemId: action.payload.itemId,
        hoveredItemSegments: action.payload.hoveredItemSegments
      };
    }
    case DrawingActions.DrawingItemActionTypes.HoverDrawingItem: {
      return {
        ...state,
        hoveredItemSegments: action.payload.hoveredItemSegments
      };
    }
    case CaActions.CaItemActionTypes.HoverCaItem: {
      return {
        ...state,
        hoveredItemSegments: action.payload.hoveredItemSegments
      };
    }
    case DataApiActions.DataApiActionTypes.GetMediaFileMetadataSuccess: {
      return {
        ...state,
        currentItemSegments: action.payload.mediaItem.geodata.segment // TODO
      };
    }
    case DataApiActions.DataApiActionTypes.GetDrawingFileMetadataSuccess: {
      return {
        ...state,
        currentItemSegments: action.payload.drawingItem.geodata.segment // TODO
      };
    }
    case DataApiActions.DataApiActionTypes.GetCaFileMetadataSuccess: {
      return {
        ...state,
        currentItemSegments: action.payload.caItem.geodata.segment // TODO
      };
    }
    case MapActions.MapActionTypes.MapMarkerSelect: {
      return {
        ...state,
        mapMarkerClicked: action.payload.mapMarkerClicked
      };
    }
    default:
      return state;
  }
}

export const getCurrentItemSegments = (state: State) => state.currentItemSegments;
export const hoveredItemId = (state: State) => state.hoverItemId;
export const hoveredItemSegments = (state: State) => state.hoveredItemSegments;
export const getGridSegments = (state: State) => state.segments;
export const getGridSegmentsLoaded = (state: State) => state.segmentsLoaded;
export const getMapData = (state: State) => state.mapData;
export const mapInitialState = (state: State) => state.mapInitialState;
export const zoomToSelection = (state: State) => state.zoomToSelection;
export const mapMarkerClicked = (state: State) => state.mapMarkerClicked;
