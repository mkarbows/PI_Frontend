import {
  DataApiActions,
  HeaderFilterActions,
  ItemFullsizeActions,
  MediaActions
} from '../actions';
import { MediaThumbnailItem } from '../../shared/models/item.model';
import { MediaThumbnails } from '../../shared/models/itemthumbnails.model';

export const mediaFeatureKey = 'media';

export interface State {
  mediaItem: MediaThumbnailItem;
  mediaThumbnails: MediaThumbnails;
}

export const initialState: State = {
  mediaItem: null,
  mediaThumbnails: null
};

export function reducer(
  state = initialState,
  action:
    | DataApiActions.DataApiActionsUnion
    | HeaderFilterActions.HeaderFilterActionsUnion
    | ItemFullsizeActions.ItemFullsizeActionsUnion
    | MediaActions.MediaItemActionsUnion
): State {
  switch (action.type) {
    case DataApiActions.DataApiActionTypes.GetMediaFileMetadataSuccess: {
      return {
        ...state,
        mediaItem: action.payload.mediaItem
      };
    }
    case ItemFullsizeActions.ItemFullsizeActionTypes.LoadMediaThumbnailsPrevPageSuccess:
    case ItemFullsizeActions.ItemFullsizeActionTypes.LoadMediaThumbnailsNextPageSuccess:
    case DataApiActions.DataApiActionTypes.GetPaginatedSegmentMediaItemsSuccess:
    case DataApiActions.DataApiActionTypes.GetMediaThumbnailsSuccess: {
      return {
        ...state,
        mediaThumbnails: action.payload.mediaThumbnails
      };
    }
    case HeaderFilterActions.HeaderFilterActionTypes.ResetMediaFiltersSuccess: {
      return {
        ...state,
        mediaItem: null,
        mediaThumbnails: action.payload.mediaThumbnails
      };
    }
    case MediaActions.MediaItemActionTypes.SelectMediaItem:
    case MediaActions.MediaItemActionTypes.SelectMediaItemType:
    case MediaActions.MediaItemActionTypes.DeselectMediaItem: {
      return {
        ...state,
        mediaItem: null
      };
    }
    case MediaActions.MediaItemActionTypes.UploadMediaItem: {
      return {
        ...state,
        mediaItem: action.payload.mediaItem
      };
    }
    default:
      return state;
  }
}

export const getMediaItem = (state: State) => state.mediaItem;
export const getMediaThumbnails = (state: State) => state.mediaThumbnails;
