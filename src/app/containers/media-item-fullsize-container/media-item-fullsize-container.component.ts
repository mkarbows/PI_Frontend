/**
 * @author Arup
 * @description
 * Container component for fullsize media item.
 **/

import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { ConfigurationService } from '../../core/configuration.service';
import { PiConfig, GeoDataTypes } from '../../core/app-config';

// actions
import {
  MediaActions,
  ItemFullsizeActions,
  RouterActions
} from '../../store/actions';
// model
import { MediaThumbnailItem } from '../../shared/models/item.model';
// reducer
import * as fromStore from '../../store';
// selectors
import * as fromPaging from '../../store/selectors/paging.selector';

@Component({
  selector: 'app-media-item-fullsize-container',
  templateUrl: './media-item-fullsize-container.component.html',
  styleUrls: ['./media-item-fullsize-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MediaItemFullsizeContainerComponent implements OnDestroy {
  /** api root from config file */
  config: PiConfig;
  apiRoot: string;
  geoDataTypes: GeoDataTypes;

  mapMarkerClicked$: Observable<boolean>;
  /** items adjacent to current item */
  adjacentItems$: Observable<MediaThumbnailItem[]>;
  currentPage$: Observable<number>;
  mediaItem$: Observable<MediaThumbnailItem>;
  pageCount$: Observable<number>;
  /** inputs required by the full size header component for paging */
  pagingInputs$: Observable<any>;
  /** first two and last two items in the array of thumbnail items */
  pagingItems$: Observable<MediaThumbnailItem[]>;
  adjacentItems: MediaThumbnailItem[];
  pagingInputs: any;
  selectedItemType: string;
  selectedNavType: string;
  currentPage: number;
  pagingItems: any;
  /** route parameters */
  routeParamsSubscription: Subscription;
  routeQueryParams: Params;
  routeQueryParamsSubscription: Subscription;

  constructor(
    private configService: ConfigurationService,
    private store: Store<fromStore.State>
  ) {
    this.config = this.configService.getConfig();
    this.apiRoot = this.config.apiRoot;
    this.geoDataTypes = this.config.geoDataTypes;

    /** get media item from store */
    this.mediaItem$ = this.store.pipe(select(fromStore.getSelectedMediaItem));

    /**
     * get item the items either side of the current
     * item in the array of media thumbnails
     */
    this.adjacentItems$ = this.store.pipe(
      select(fromPaging.getAdjacentMediaItems),
      tap(adjacentItems => this.adjacentItems = adjacentItems)
    );
    /** get items at start and end of page */
    this.pagingItems$ = this.store.pipe(
      select(fromPaging.checkMediaPagingItems)
    );
    /** get current page */
    this.currentPage$ = this.store.pipe(select(fromStore.getCurrentPage));
    /** get page count */
    this.pageCount$ = this.store.pipe(select(fromPaging.getMediaPageCount));
    /** combine all observables to pass into header component */
    this.pagingInputs$ = combineLatest([
      this.adjacentItems$,
      this.pagingItems$,
      this.currentPage$,
      this.pageCount$
    ]);
    this.mapMarkerClicked$ = this.store.pipe(select(fromStore.getMapMarkerClicked));

    /** get route params */
    this.routeParamsSubscription = store
      .select(fromStore.getRouteParams)
      .subscribe((params: Params) => {
        this.selectedNavType = params.selectedNavType;
        this.currentPage = params.currentPage;
    });

    this.routeQueryParamsSubscription = store
      .select(fromStore.getRouteQueryParams)
      .subscribe((params: Params) => {
        this.routeQueryParams = params;
        this.selectedItemType = params.type;
      });
  }

  /** open modal */
  openModal(item: MediaThumbnailItem) {
    this.store.dispatch(new ItemFullsizeActions.ModalOpen({ item }));
  }

  /**
   * get next item
   */
  getNextItem() {
    this.store.dispatch(new MediaActions.NextMediaItem());
    this.store.dispatch(new RouterActions.Go({
      path: [
        'dashboard',
        this.selectedNavType,
        this.currentPage,
        this.adjacentItems[1].url_endpoint
      ],
      query: {type: this.selectedItemType}
    }));
  }

  /**
   * get previous item
   */
  getPrevItem() {
    this.store.dispatch(new MediaActions.PrevMediaItem());
    this.store.dispatch(new RouterActions.Go({
      path: [
        'dashboard',
        this.selectedNavType,
        this.currentPage,
        this.adjacentItems[0].url_endpoint
      ],
      query: {type: this.selectedItemType}
    }));
  }

  /** get previous page of data */
  getPrevPage() {
    this.currentPage = Number(this.currentPage) - 1;
    this.store.dispatch(new MediaActions.PrevMediaItemPrevPage());
  }

  /** get next page of data */
  getNextPage() {
    this.currentPage = Number(this.currentPage) + 1;
    this.store.dispatch(new MediaActions.NextMediaItemNextPage());
  }

  /** Close fullsize component */
  closeFullsize() {
    this.store.dispatch(new MediaActions.DeselectMediaItem());
    this.store.dispatch(new RouterActions.Go({
      path: ['dashboard', this.selectedNavType, this.currentPage],
      query: {
        ...this.routeQueryParams,
        type: this.selectedItemType
      }
    }));
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.routeQueryParamsSubscription.unsubscribe();
  }
}
