import { SpecificationThumbnails } from 'src/app/shared/models/itemthumbnails.model';
import { DataApiActions, SpecificationActions, ItemFullsizeActions } from '../actions';
import { SpecificationThumbnailItem } from 'src/app/shared/models/item.model';

export const specificationFeatureKey = 'specification';

export interface State {
  specificationItem: SpecificationThumbnailItem;
  specificationThumbnails: SpecificationThumbnails;
}

export const initialState: State = {
  specificationItem: null,
  specificationThumbnails: null
};

export function reducer(
  state = initialState,
  action:
  | DataApiActions.DataApiActionsUnion
  | SpecificationActions.SpecificationActionsUnion
  | ItemFullsizeActions.ItemFullsizeActionsUnion
): State {
  switch (action.type) {
    case DataApiActions.DataApiActionTypes.GetSpecificationThumbnailsSuccess:
    case ItemFullsizeActions.ItemFullsizeActionTypes.LoadSpecificationThumbnailsNextPageSuccess:
    case ItemFullsizeActions.ItemFullsizeActionTypes.LoadSpecificationThumbnailsPrevPageSuccess: {
      return {
        ...state,
        specificationThumbnails: action.payload.specificationThumbnails
      };
    }
    case DataApiActions.DataApiActionTypes.GetSpecificationFileMetadataSuccess: {
      return {
        ...state,
        specificationItem: action.payload.specificationItem
      };
    }
    case SpecificationActions.SpecificationItemActionTypes.SelectSpecificationItem:
    case SpecificationActions.SpecificationItemActionTypes.DeselectSpecificationItem: {
      return {
        ...state,
        specificationItem: null
      };
    }
    default:
      return state;
  }
}

export const getSpecificationThumbnails = (state: State) => state.specificationThumbnails;
export const getSpecificationItem = (state: State) => state.specificationItem;
