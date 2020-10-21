import { DrawingThumbnailItem } from 'src/app/shared/models/item.model';
import { DrawingThumbnails } from 'src/app/shared/models/itemthumbnails.model';
import {
  DataApiActions,
  DrawingActions,
  HeaderFilterActions,
  ItemFullsizeActions
} from '../actions';

export const drawingFeatureKey = 'drawing';

export interface State {
  drawingItem: DrawingThumbnailItem;
  drawingThumbnails: DrawingThumbnails;
}

export const initialState: State = {
  drawingItem: null,
  drawingThumbnails: null
};

export function reducer(
  state = initialState,
  action:
    | DataApiActions.DataApiActionsUnion
    | DrawingActions.DrawingItemActionsUnion
    | HeaderFilterActions.HeaderFilterActionsUnion
    | ItemFullsizeActions.ItemFullsizeActionsUnion
): State {
  switch (action.type) {
    case ItemFullsizeActions.ItemFullsizeActionTypes.LoadDrawingThumbnailsPrevPageSuccess:
    case ItemFullsizeActions.ItemFullsizeActionTypes.LoadDrawingThumbnailsNextPageSuccess:
    case DataApiActions.DataApiActionTypes.GetPaginatedSegmentDrawingItemsSuccess:
    case DataApiActions.DataApiActionTypes.GetDrawingThumbnailsSuccess: {
      return {
        ...state,
        drawingThumbnails: action.payload.drawingThumbnails
      };
    }
    case DataApiActions.DataApiActionTypes.GetDrawingFileMetadataSuccess: {
      return {
        ...state,
        drawingItem: action.payload.drawingItem
      };
    }
    case DrawingActions.DrawingItemActionTypes.DeselectDrawingItem:
    case DrawingActions.DrawingItemActionTypes.SelectDrawingItem:
    case DrawingActions.DrawingItemActionTypes.SelectDrawingItemType: {
      return {
        ...state,
        drawingItem: null
      };
    }
    case HeaderFilterActions.HeaderFilterActionTypes.ResetDrawingFiltersSuccess: {
      return {
        ...state,
        drawingThumbnails: action.payload.drawingThumbnails,
        drawingItem: null
      };
    }
    case ItemFullsizeActions.ItemFullsizeActionTypes.UploadMarkupFileSuccess: {
      return {
        ...state,
        drawingItem: action.payload.drawingItem
      };
    }
    case ItemFullsizeActions.ItemFullsizeActionTypes.DeleteMarkupFileSuccess: {
      return {
        ...state,
        drawingItem: action.payload.drawingItem
      };
    }
    default:
      return state;
  }
}

export const getDrawingThumbnails = (state: State) => state.drawingThumbnails;
export const getDrawingItem = (state: State) => state.drawingItem;
