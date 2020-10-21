import { createSelector } from '@ngrx/store';

// reducers
import * as fromFeature from '../reducers';
import * as fromSpecification from '../reducers/specification.reducer';

export const getSpecificationThumbnails = createSelector(
  fromFeature.getSpecificationState,
  fromSpecification.getSpecificationThumbnails
);

export const getSelectedSpecificationItem = createSelector(
  fromFeature.getSpecificationState,
  fromSpecification.getSpecificationItem
);
