import {
  DataApiActions,
  HeaderFilterActions
} from '../actions';

export const pagingFeatureKey = 'paging';

export interface State {
  fileCount: number;
}

export const initialState: State = {
  fileCount: 0,
};

// return state based on action type
export function reducer(
  state = initialState,
  action:
    | DataApiActions.DataApiActionsUnion
    | HeaderFilterActions.HeaderFilterActionsUnion
): State {
  switch (action.type) {
    case DataApiActions.DataApiActionTypes.GetMediaThumbnailsSuccess:
    case DataApiActions.DataApiActionTypes.GetPaginatedSegmentMediaItemsSuccess:
    case HeaderFilterActions.HeaderFilterActionTypes.ResetMediaFiltersSuccess: {
      return {
        ...state,
        fileCount: action.payload.mediaThumbnails.total_files
      };
    }
    case DataApiActions.DataApiActionTypes.GetDrawingThumbnailsSuccess:
    case DataApiActions.DataApiActionTypes.GetPaginatedSegmentDrawingItemsSuccess:
    case HeaderFilterActions.HeaderFilterActionTypes.ResetDrawingFiltersSuccess: {
      return {
        ...state,
        fileCount: action.payload.drawingThumbnails.total_files
      };
    }
    case DataApiActions.DataApiActionTypes.GetSpecificationThumbnailsSuccess: {
      return {
        ...state,
        fileCount: action.payload.specificationThumbnails.total_files
      };
    }
    case DataApiActions.DataApiActionTypes.GetCaThumbnailsSuccess:
    case DataApiActions.DataApiActionTypes.GetPaginatedSegmentCaItemsSuccess:
    case HeaderFilterActions.HeaderFilterActionTypes.ResetCaFiltersSuccess: {
      return {
        ...state,
        fileCount: action.payload.caThumbnails.total_files
      };
    }
    default:
      return state;
  }
}

// export selector functions
export const getFileCount = (state: State) => state.fileCount;
