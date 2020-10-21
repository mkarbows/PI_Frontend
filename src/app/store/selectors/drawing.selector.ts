import { createSelector } from '@ngrx/store';

// reducers
import * as fromFeature from '../reducers';
import * as fromDrawing from '../reducers/drawing.reducer';
import * as fromFilter from '../reducers/filters.reducer';

/** get list of drawing item types */
export const getDrawingTypeFilters = createSelector(
  fromFeature.getFilterState,
  fromFilter.getDrawingTypeFilters
);

export const getDrawingThumbnails = createSelector(
  fromFeature.getDrawingState,
  fromDrawing.getDrawingThumbnails
);

export const getSelectedDrawingItem = createSelector(
  fromFeature.getDrawingState,
  fromDrawing.getDrawingItem
);
