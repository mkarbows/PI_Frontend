import { createSelector } from '@ngrx/store';

// reducers
import * as fromFeature from '../reducers';
import * as fromMap from '../reducers/map.reducer';

/**get segment grid */
export const getSegments = createSelector(
  fromFeature.getMapState,
  fromMap.getGridSegments
);

export const getSegmentsLoaded = createSelector(
  fromFeature.getMapState,
  fromMap.getGridSegmentsLoaded
);

/** get selected item's segment*/
export const getCurrentItemSegments = createSelector(
  fromFeature.getMapState,
  fromMap.getCurrentItemSegments
);

/** get data needed to display the correct layers on the map
 * (i.e. coordinates for map markers)
*/
export const getMapData = createSelector(
  fromFeature.getMapState,
  fromMap.getMapData
);

export const getHoveredItemId = createSelector(
  fromFeature.getMapState,
  fromMap.hoveredItemId,
);

export const getHoveredItemSegments = createSelector(
  fromFeature.getMapState,
  fromMap.hoveredItemSegments,
);

export const getZoomToSelection = createSelector(
  fromFeature.getMapState,
  fromMap.zoomToSelection
);

export const getMapInitialState = createSelector(
  fromFeature.getMapState,
  fromMap.mapInitialState
);

export const getMapMarkerClicked = createSelector(
  fromFeature.getMapState,
  fromMap.mapMarkerClicked
);
