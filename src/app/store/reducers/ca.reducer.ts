import { CaThumbnailItem } from 'src/app/shared/models/item.model';
import { CaThumbnails } from 'src/app/shared/models/itemthumbnails.model';
import {
  CaActions,
  DataApiActions,
  HeaderFilterActions,
  ItemFullsizeActions
} from '../actions';

export const caFeatureKey = 'ca';

export interface State {
  caItem: CaThumbnailItem;
  caThumbnails: CaThumbnails;
}

export const initialState: State = {
  caItem: null,
  caThumbnails: null
};

export function reducer(
  state = initialState,
  action:
    | CaActions.CaItemActionsUnion
    | DataApiActions.DataApiActionsUnion
    | HeaderFilterActions.HeaderFilterActionsUnion
    | ItemFullsizeActions.ItemFullsizeActionsUnion
): State {
  switch (action.type) {
    case ItemFullsizeActions.ItemFullsizeActionTypes.LoadCaThumbnailsPrevPageSuccess:
    case ItemFullsizeActions.ItemFullsizeActionTypes.LoadCaThumbnailsNextPageSuccess:
    case DataApiActions.DataApiActionTypes.GetPaginatedSegmentCaItemsSuccess:
    case DataApiActions.DataApiActionTypes.GetCaThumbnailsSuccess: {
      return {
        ...state,
        caThumbnails: action.payload.caThumbnails
      };
    }
    case DataApiActions.DataApiActionTypes.GetCaFileMetadataSuccess: {
      return {
        ...state,
        caItem: action.payload.caItem
      };
    }
    case CaActions.CaItemActionTypes.DeselectCaItem:
    case CaActions.CaItemActionTypes.SelectCaItem:
    case CaActions.CaItemActionTypes.SelectCaItemType: {
      return {
        ...state,
        caItem: null
      };
    }
    case HeaderFilterActions.HeaderFilterActionTypes.ResetCaFiltersSuccess: {
      return {
        ...state,
        caThumbnails: action.payload.caThumbnails,
        caItem: null
      };
    }
    default:
      return state;
  }
}

export const getCaItem = (state: State) => state.caItem;
export const getCaThumbnails = (state: State) => state.caThumbnails;
