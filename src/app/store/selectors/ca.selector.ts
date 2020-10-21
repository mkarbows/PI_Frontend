import { createSelector } from '@ngrx/store';

// reducers
import * as fromFeature from '../reducers';
import * as fromCa from '../reducers/ca.reducer';
import * as fromFilter from '../reducers/filters.reducer';

/** get list of ca item types */
export const getCaTypeFilters = createSelector(
  fromFeature.getFilterState,
  fromFilter.getCaTypeFilters
);

/** get list of ca statuses */
export const getCaStatusFilters = createSelector(
  fromFeature.getFilterState,
  fromFilter.getCaStatusFilters
);

export const getCaThumbnails = createSelector(
  fromFeature.getCaState,
  fromCa.getCaThumbnails
);

export const getSelectedCaItem = createSelector(
  fromFeature.getCaState,
  fromCa.getCaItem
);
