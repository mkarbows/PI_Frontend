import { createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

// reducers
import { RouterStateUrl } from '../reducers';
import * as fromFeature from '../reducers';
import * as fromFilter from '../reducers/filters.reducer';
// selectors
import * as fromMedia from './media.selector';
import * as fromDrawing from './drawing.selector';
import * as fromCa from './ca.selector';

export const getSelectedNavType = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): string => {
    return routerState && routerState.state.params.selectedNavType;
  }
);

/** get the current item type list depending on the current nav type */
export const getCurrentitemTypeFilters = createSelector(
  fromMedia.getMediaTypeFilters,
  fromDrawing.getDrawingTypeFilters,
  fromCa.getCaTypeFilters,
  getSelectedNavType,
  (mediaTypes, drawingTypes, caTypes, selectedNav) => {
    if (selectedNav === 'media') {
      return mediaTypes;
    } else if (selectedNav === 'drawing') {
      return drawingTypes;
    } else if (selectedNav === 'ca') {
      return caTypes;
    }
  }
);

export const getSelectedItemType = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): string => {
    return routerState && routerState.state.queryParams.type;
  }
);

export const getDrawingSheetTypeFilters = createSelector(
  fromFeature.getFilterState,
  fromFilter.getDrawingSheetTypeFilters
);

export const getSelectedSheetType = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): string => {
    return (routerState && routerState.state.queryParams.sheettype) || '';
  }
);

export const getSelectedCaStatus = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): string => {
    return (routerState && routerState.state.queryParams.status) || '';
  }
);

export const getSpecificationDivisionFilters = createSelector(
  fromFeature.getFilterState,
  fromFilter.getSpecificationDivisionFilters
);

export const getSelectedDivision = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): string => {
    return (routerState && routerState.state.queryParams.division) || '';
  }
);

export const getFilteredSegment = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>, props): string => {
    return (props && routerState && routerState.state.queryParams[props.geoData2]) || ''; // TODO
  }
);

export const getTerminalFilters = createSelector(
  fromFeature.getFilterState,
  fromFilter.getTerminalFilters
);

export const getSelectedTerminal = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>, props): string => {
    return (props && routerState && routerState.state.queryParams[props.geoData1]) || '';
  }
);

export const getPhaseFilters = createSelector(
  fromFeature.getFilterState,
  fromFilter.getPhaseFilters
);

export const getSelectedPhase = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): string => {
    return (routerState && routerState.state.queryParams.phase) || '';
  }
);

export const getDisciplineFilters = createSelector(
  fromFeature.getFilterState,
  fromFilter.getDisciplineFilters
);

export const getSelectedDiscipline = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): string => {
    return (routerState && routerState.state.queryParams.discipline) || '';
  }
);

/** get list of levels */
export const getLevels = createSelector(
  fromFeature.getFilterState,
  fromFilter.getLevels
);

export const getSelectedLevel = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): string => {
    return (routerState && routerState.state.queryParams.level) || '';
  }
);

/** get selected start date filter */
export const getSelectedStartDate = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): string => {
    return (routerState && routerState.state.queryParams.start_date) || '';
  }
);

/** get selected end date filter */
export const getSelectedEndDate = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): string => {
    return (routerState && routerState.state.queryParams.end_date) || '';
  }
);

export const getSegmentFilters = createSelector(
  fromFeature.getFilterState,
  fromFilter.getSegmentFilters
);

export const getDarkMode = createSelector(
  fromFeature.getFilterState,
  fromFilter.getDarkMode
);
