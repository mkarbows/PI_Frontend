import { createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

// reducers
import { RouterStateUrl } from '../reducers';
import * as fromFeature from '../reducers';
import * as fromPaging from '../reducers/paging.reducer';

// selectors
import * as fromMedia from './media.selector';
import * as fromDrawing from './drawing.selector';
import * as fromSpecification from './specification.selector';
import * as fromCa from './ca.selector';

import {
  MediaThumbnails,
  DrawingThumbnails,
  SpecificationThumbnails,
  CaThumbnails
} from '../../shared/models/itemthumbnails.model';
import {
  MediaThumbnailItem,
  DrawingThumbnailItem,
  SpecificationThumbnailItem,
  CaThumbnailItem
} from '../../shared/models/item.model';

export const getCurrentPage = createSelector(
  fromFeature.getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>): number => {
    return routerState && routerState.state.params.currentPage;
  }
 );

 /** get the number of files loaded to use in paging component */
export const getFileCount = createSelector(
  fromFeature.getPagingState,
  fromPaging.getFileCount
);

/** get media items before and after the current item */
export const getAdjacentMediaItems = createSelector(
  fromMedia.getMediaThumbnails,
  fromMedia.getSelectedMediaItem,
  (thumbnails: MediaThumbnails, selectedItem: MediaThumbnailItem) => {
    if (thumbnails && selectedItem && Object.keys(selectedItem).length !== 0) {
      const prevNext: MediaThumbnailItem[] = [];
      const itemsCopy: MediaThumbnails = thumbnails;
      itemsCopy.data.forEach(thumbItem => {
        if (thumbItem.url_endpoint === selectedItem.url_endpoint) {
          const prevIndex = itemsCopy.data.indexOf(thumbItem) - 1;
          const nextIndex = itemsCopy.data.indexOf(thumbItem) + 1;
          prevNext.push(itemsCopy.data[prevIndex], itemsCopy.data[nextIndex]);
          return prevNext;
        }
      });
      return prevNext;
    }
  }
);

/**
 * get first, second, penultimate and last media items.  Used for
 * checking where the 'current item' is in the array of items
 * and whether we need to request a new page of data
 */
export const checkMediaPagingItems = createSelector(
  fromMedia.getMediaThumbnails,
  (mediaThumbnails: MediaThumbnails) =>
    mediaThumbnails && [
      mediaThumbnails.data[0],
      mediaThumbnails.data[1],
      mediaThumbnails.data[18],
      mediaThumbnails.data[mediaThumbnails.data.length - 1]
    ]
);

export const getMediaPageCount = createSelector(
  fromMedia.getMediaThumbnails,
  (mediaThumbnails: MediaThumbnails) =>
    mediaThumbnails && mediaThumbnails.page_count
);

/** get drawing items before and after the current item */
export const getAdjacentDrawingItems = createSelector(
  fromDrawing.getDrawingThumbnails,
  fromDrawing.getSelectedDrawingItem,
  (thumbnails: DrawingThumbnails, selectedItem: DrawingThumbnailItem) => {
    if (thumbnails && selectedItem && Object.keys(selectedItem).length !== 0) {
      const prevNext: DrawingThumbnailItem[] = [];
      const itemsCopy: DrawingThumbnails = thumbnails;
      itemsCopy.data.forEach(thumbItem => {
        if (thumbItem.url_endpoint === selectedItem.url_endpoint) {
          const prevIndex = itemsCopy.data.indexOf(thumbItem) - 1;
          const nextIndex = itemsCopy.data.indexOf(thumbItem) + 1;
          prevNext.push(itemsCopy.data[prevIndex], itemsCopy.data[nextIndex]);
          return prevNext;
        }
      });
      return prevNext;
    }
  }
);

/** get specification items before and after the current item */
export const getAdjacentSpecificationItems = createSelector(
  fromSpecification.getSpecificationThumbnails,
  fromSpecification.getSelectedSpecificationItem,
  (thumbnails: SpecificationThumbnails, selectedItem: SpecificationThumbnailItem) => {
    if (thumbnails && selectedItem && Object.keys(selectedItem).length !== 0) {
      const prevNext: SpecificationThumbnailItem[] = [];
      const itemsCopy: SpecificationThumbnails = thumbnails;
      itemsCopy.data.forEach(thumbItem => {
        if (thumbItem.url_endpoint === selectedItem.url_endpoint) {
          const prevIndex = itemsCopy.data.indexOf(thumbItem) - 1;
          const nextIndex = itemsCopy.data.indexOf(thumbItem) + 1;
          prevNext.push(itemsCopy.data[prevIndex], itemsCopy.data[nextIndex]);
          return prevNext;
        }
      });
      return prevNext;
    }
  }
);

/** get ca items before and after the current item */
export const getAdjacentCaItems = createSelector(
  fromCa.getCaThumbnails,
  fromCa.getSelectedCaItem,
  (thumbnails: CaThumbnails, selectedItem: CaThumbnailItem) => {
    if (thumbnails && selectedItem && Object.keys(selectedItem).length !== 0) {
      const prevNext: CaThumbnailItem[] = [];
      const itemsCopy: CaThumbnails = thumbnails;
      itemsCopy.data.forEach(thumbItem => {
        if (thumbItem.url_endpoint === selectedItem.url_endpoint) {
          const prevIndex = itemsCopy.data.indexOf(thumbItem) - 1;
          const nextIndex = itemsCopy.data.indexOf(thumbItem) + 1;
          prevNext.push(itemsCopy.data[prevIndex], itemsCopy.data[nextIndex]);
          return prevNext;
        }
      });
      return prevNext;
    }
  }
);

/**
 * get first, second, penultimate and last drawing items.  Used for
 * checking where the 'current item' is in the array of items
 * and whether we need to request a new page of data
 */
export const checkDrawingPagingItems = createSelector(
  fromDrawing.getDrawingThumbnails,
  (drawingThumbnails: DrawingThumbnails) =>
    drawingThumbnails && [
      drawingThumbnails.data[0],
      drawingThumbnails.data[1],
      drawingThumbnails.data[18],
      drawingThumbnails.data[drawingThumbnails.data.length - 1]
    ]
);

export const getDrawingPageCount = createSelector(
  fromDrawing.getDrawingThumbnails,
  (drawingThumbnails: DrawingThumbnails) =>
    drawingThumbnails && drawingThumbnails.page_count
);

/**
 * get first, second, penultimate and last specification items.  Used for
 * checking where the 'current item' is in the array of items
 * and whether we need to request a new page of data
 */
export const checkSpecificationPagingItems = createSelector(
  fromSpecification.getSpecificationThumbnails,
  (specificationThumbnails: SpecificationThumbnails) =>
    specificationThumbnails && [
      specificationThumbnails.data[0],
      specificationThumbnails.data[1],
      specificationThumbnails.data[18],
      specificationThumbnails.data[specificationThumbnails.data.length - 1]
    ]
);

export const getSpecificationPageCount = createSelector(
  fromSpecification.getSpecificationThumbnails,
  (specificationThumbnails: SpecificationThumbnails) =>
    specificationThumbnails && specificationThumbnails.page_count
);

/**
 * get first, second, penultimate and last ca items.  Used for
 * checking where the 'current item' is in the array of items
 * and whether we need to request a new page of data
 */
export const checkCaPagingItems = createSelector(
  fromCa.getCaThumbnails,
  (caThumbnails: CaThumbnails) =>
    caThumbnails && [
      caThumbnails.data[0],
      caThumbnails.data[1],
      caThumbnails.data[18],
      caThumbnails.data[caThumbnails.data.length - 1]
    ]
);

export const getCaPageCount = createSelector(
  fromCa.getCaThumbnails,
  (caThumbnails: CaThumbnails) =>
    caThumbnails && caThumbnails.page_count
);
