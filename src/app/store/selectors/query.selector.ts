import { createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

// selectors
import * as fromFilters from './filters.selector';
import * as fromMedia from './media.selector';
import * as fromDrawing from './drawing.selector';
import * as fromCa from './ca.selector';

// reducers
import * as fromFeature from '../reducers';
import { RouterStateUrl } from '../reducers';

/** get all of the query parameters that media, drawings
 * and ca all have in common (ie terminal, phase, discipline,
 * level, segment, start & end date, and item type)
 */
export const getCommonQueryParams = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>) => {
    if (routerState) {
      const query = routerState.state.queryParams;
      const urlParams: string[] = [];
      Object.keys(query).map((key) => {
        urlParams.push(`${key}=${query[key]}`);
      });
      return urlParams;
    }
  }
);

export const getCurrentPageString = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>) => {
    if (routerState) {
      const parameters = routerState.state.params;
      const currentPageString: string[] = ['page=' + parameters.currentPage];
      return currentPageString;
    }
  }
);

export const getNextPageString = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>) => {
    if (routerState) {
      const parameters = routerState.state.params;
      const nextPage: string[] = ['page=' + (Number(parameters.currentPage) + 1)];
      return nextPage;
    }
  }
);

export const getPrevPageString = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>) => {
    if (routerState) {
      const parameters = routerState.state.params;
      const prevPage: string[] = ['page=' + (Number(parameters.currentPage) - 1)];
      return prevPage;
    }
  }
);

/** create query for media items */
export const getMediaItemsQuery = createSelector(
  fromFeature.getRouterState,
  getCommonQueryParams,
  getCurrentPageString,
  (routerState: RouterReducerState<RouterStateUrl>, qParams, currPage) => {
    if (routerState) {
      const commonParams: string[] = qParams;
      const queryString = commonParams.concat(currPage);
      return queryString.join('&');
    }
  }
);

/** get everything for next fullsize media item on the next page
 * of results and format the query for the data service
 */
export const getMediaNextItemNextPageQuery = createSelector(
  fromFeature.getRouterState,
  getCommonQueryParams,
  getNextPageString,
  (routerState: RouterReducerState<RouterStateUrl>, qParams, nextPage) => {
    if (routerState) {
      const commonParams: string[] = qParams;
      const queryString = commonParams.concat(nextPage);
      return queryString.join('&');
    }
  }
);

/** get everything for the previous media item on the
 * previous page and format the query for the data service
 */
export const getMediaPrevItemPrevPageQuery = createSelector(
  fromFeature.getRouterState,
  getCommonQueryParams,
  getPrevPageString,
  (routerState: RouterReducerState<RouterStateUrl>, qParams, prevPage) => {
    if (routerState) {
      const commonParams: string[] = qParams;
      const queryString = commonParams.concat(prevPage);
      return queryString.join('&');
    }
  }
);

/** create query for drawing items */
export const getDrawingItemsQuery = createSelector(
  fromFeature.getRouterState,
  getCommonQueryParams,
  getCurrentPageString,
  (routerState: RouterReducerState<RouterStateUrl>, qParams, currPage) => {
    if (routerState) {
      const commonParams: string[] = qParams;
      let queryString = commonParams.concat(currPage);
      const drawingQuery = routerState.state.queryParams;
      if (drawingQuery.sheettype) {
        const drawingSheetType = 'sheet_type=' + drawingQuery.sheettype;
        queryString = queryString.concat(drawingSheetType);
      }
      return queryString.join('&');
    }
  }
);

/** get everything for the next fullsize drawing item on the
 * next page and format the query for the data service
 */
export const getDrawingNextItemNextPageQuery = createSelector(
  fromFeature.getRouterState,
  getCommonQueryParams,
  getNextPageString,
  (routerState: RouterReducerState<RouterStateUrl>, qParams, nextPage) => {
    if (routerState) {
      const commonParams: string[] = qParams;
      const drawingQuery = routerState.state.queryParams;
      let queryString = commonParams.concat(nextPage);
      if (drawingQuery.sheettype) {
        const drawingSheetType = ['sheet_type=' + drawingQuery.sheettype];
        queryString = queryString.concat(drawingSheetType);
      }
      return queryString.join('&');
    }
  }
);

/** get everything for the previous fullsize drawing item on the
 * previous page and format the query for the data service
 */
export const getDrawingPrevItemPrevPageQuery = createSelector(
  fromFeature.getRouterState,
  getCommonQueryParams,
  getPrevPageString,
  (routerState: RouterReducerState<RouterStateUrl>, qParams, prevPage) => {
    if (routerState) {
      const commonParams: string[] = qParams;
      const drawingQuery = routerState.state.queryParams;
      let queryString = commonParams.concat(prevPage);
      if (drawingQuery.sheettype) {
        const drawingSheetType = ['sheet_type=' + drawingQuery.sheettype];
        queryString = queryString.concat(drawingSheetType);
      }
      return queryString.join('&');
    }
  }
);

/** get everything for the spec items query and format the query
 * for the data service
 */
export const getSpecItemsQuery = createSelector(
  fromFeature.getRouterState,
  getCommonQueryParams,
  getCurrentPageString,
  (routerState: RouterReducerState<RouterStateUrl>, qParams, currPage) => {
    if (routerState) {
      const commonParams: string[] = qParams;
      const specificationQuery = routerState.state.queryParams;
      // filter through the query params and remove the type filter
      let queryString = commonParams.filter(f =>
        !f.includes('type')
      );
      queryString = queryString.concat(currPage);
      if (specificationQuery.division) {
        const specificationDivision = 'division=' + specificationQuery.division;
        queryString = queryString.concat(specificationDivision);
      }
      return queryString.join('&');
    }
  }
);

/** get everything for the next fullsize specification item on the
 * next page and format the query for the data service
 */
export const getSpecificationNextItemNextPageQuery = createSelector(
  fromFeature.getRouterState,
  getCommonQueryParams,
  getNextPageString,
  (routerState: RouterReducerState<RouterStateUrl>, qParams, nextPage) => {
    if (routerState) {
      const commonParams: string[] = qParams;
      const specificationQuery = routerState.state.queryParams;
      let queryString = commonParams.filter(f =>
        !f.includes('type')
      );
      queryString = queryString.concat(nextPage);
      if (specificationQuery.division) {
        const drawingSheetType = ['division=' + specificationQuery.division];
        queryString = queryString.concat(drawingSheetType);
      }
      return queryString.join('&');
    }
  }
);

/** get everything for the next fullsize specification item on the
 * next page and format the query for the data service
 */
export const getSpecificationPrevItemPrevPageQuery = createSelector(
  fromFeature.getRouterState,
  getCommonQueryParams,
  getPrevPageString,
  (routerState: RouterReducerState<RouterStateUrl>, qParams, prev) => {
    if (routerState) {
      const commonParams: string[] = qParams;
      const specificationQuery = routerState.state.queryParams;
      let queryString = commonParams.filter(f =>
        !f.includes('type')
      );
      queryString = queryString.concat(prev);
      if (specificationQuery.division) {
        const drawingSheetType = ['division=' + specificationQuery.division];
        queryString = queryString.concat(drawingSheetType);
      }
      return queryString.join('&');
    }
  }
);

/** get everything for the ca items query and format the query
 * for the data service
 */
export const getCaItemsQuery = createSelector(
  fromFeature.getRouterState,
  getCommonQueryParams,
  getCurrentPageString,
  (routerState: RouterReducerState<RouterStateUrl>, qParams, currPage) => {
    if (routerState) {
      const commonParams: string[] = qParams;
      const caQuery = routerState.state.queryParams;
      let queryString = commonParams.concat(currPage);
      if (caQuery.status) {
        const caStatus = 'status=' + caQuery.status;
        queryString = queryString.concat(caStatus);
      }
      return queryString.join('&');
    }
  }
);

/** get everything for the next fullsize ca item on the next page
 * and format the query for the data service
 */
export const getCaNextItemNextPageQuery = createSelector(
  fromFeature.getRouterState,
  getCommonQueryParams,
  getNextPageString,
  (routerState: RouterReducerState<RouterStateUrl>, qParams, nextPage) => {
    if (routerState) {
      const commonParams: string[] = qParams;
      const caQuery = routerState.state.queryParams;
      let queryString = commonParams.concat(nextPage);
      if (caQuery.status) {
        const caStatus = 'status=' + caQuery.status;
        queryString = queryString.concat(caStatus);
      }
      return queryString.join('&');
    }
  }
);

/** get everything for the previous ca item on the previous
 * page and format the string for the data service
 */
export const getCaPrevItemPrevPageQuery = createSelector(
  fromFeature.getRouterState,
  getCommonQueryParams,
  getPrevPageString,
  (routerState: RouterReducerState<RouterStateUrl>, qParams, prevPage) => {
    if (routerState) {
      const commonParams: string[] = qParams;
      const caQuery = routerState.state.queryParams;
      let queryString = commonParams.concat(prevPage);
      if (caQuery.status) {
        const caStatus = 'status=' + caQuery.status;
        queryString = queryString.concat(caStatus);
      }
      return queryString.join('&');
    }
  }
);

/** get the selected segment and selected levels from the map
 * to format the correct query to send to the data service
 */
export const getMapDataQuery = createSelector(
  fromFeature.getRouterState,
  getCommonQueryParams,
  (routerState: RouterReducerState<RouterStateUrl>, qParams) => {
    if (routerState) {
      const commonParams: string[] = qParams;
      return commonParams.join('&');
    }
  }
);

/** format the query to reset the current thumbnails */
export const getThumbnailItemsResetQuery = createSelector(
  fromFilters.getSelectedNavType,
  fromMedia.getMediaTypeFilters,
  fromDrawing.getDrawingTypeFilters,
  fromCa.getCaTypeFilters,
  (navType, mediaTypes, drawingTypes, caTypes) => {
    if (navType === 'media' && mediaTypes.length > 0) {
      return 'type=' + mediaTypes[0] + '&page=1';
    } else if (navType === 'drawing' && drawingTypes.length > 0) {
      return 'type=' + drawingTypes[0] + '&page=1';
    } else if (navType === 'ca' && caTypes.length > 0) {
      return 'type=' + caTypes[0] + '&page=1';
    }
  }
);

