import { createSelector } from '@ngrx/store';

// reducers
import * as fromFeature from '../reducers';
import * as fromFilter from '../reducers/filters.reducer';
import * as fromMedia from '../reducers/media.reducer';

/** get list of media item types */
export const getMediaTypeFilters = createSelector(
  fromFeature.getFilterState,
  fromFilter.getMediaTypeFilters
);

export const getMediaThumbnails = createSelector(
  fromFeature.getMediaState,
  fromMedia.getMediaThumbnails
);

export const getSelectedMediaItem = createSelector(
  fromFeature.getMediaState,
  fromMedia.getMediaItem
);
