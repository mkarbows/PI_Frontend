/**
 * @author Arup
 * @description
 * Container component for fullsize specification item.
 **/

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SpecificationThumbnailItem, CaThumbnailItem } from 'src/app/shared/models/item.model';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { Params } from '@angular/router';
import { tap } from 'rxjs/operators';

import { ConfigurationService } from '../../core/configuration.service';
import { PiConfig } from '../../core/app-config';
// reducer
import * as fromStore from '../../store';
// selectors
import * as fromPaging from '../../store/selectors/paging.selector';
// actions
import {
  SpecificationActions,
  ItemFullsizeActions,
  RouterActions,
  CaActions
} from '../../store';

@Component({
  selector: 'app-specification-item-fullsize-container',
  templateUrl: './specification-item-fullsize-container.component.html',
  styleUrls: ['./specification-item-fullsize-container.component.css']
})
export class SpecificationItemFullsizeContainerComponent implements OnInit, OnDestroy {
  /** api root from config file */
  config: PiConfig;
  apiRoot: string;

  /** items adjacent to current item */
  adjacentItems$: Observable<any>;
  currentPage$: Observable<number>;
  specificationItem$: Observable<SpecificationThumbnailItem>;
  pageCount$: Observable<number>;
  /** inputs required by the full size header component for paging */
  pagingInputs$: Observable<any>;
  /** first two and last two items in the array of thumbnail items */
  pagingItems$: Observable<any>;
  adjacentItems: any;
  pagingInputs: any;
  selectedDivision: string;
  selectedNavType: string;
  currentPage: number;
  pagingItems: any;
  /** route parameters */
  routeParamsSubscription: Subscription;
  routeQueryParams: Params;
  routeQueryParamsSubscription: Subscription;

  constructor(
    private store: Store<fromStore.State>,
    private configService: ConfigurationService,
  ) {
    this.config = this.configService.getConfig();
    this.apiRoot = this.config.apiRoot;

    /** get specification item from store */
    this.specificationItem$ = this.store.pipe(
      select(fromStore.getSelectedSpecificationItem)
    );

    /**
     * get item the items either side of the current
     * item in the array of media thumbnails
     */
    this.adjacentItems$ = this.store.pipe(
      select(fromPaging.getAdjacentSpecificationItems),
      tap(adjacentItems => this.adjacentItems = adjacentItems)
    );
    /** get items at start and end of page */
    this.pagingItems$ = this.store.pipe(
      select(fromPaging.checkSpecificationPagingItems)
    );
    /** get current page */
    this.currentPage$ = this.store.pipe(select(fromStore.getCurrentPage));
    /** get page count */
    this.pageCount$ = this.store.pipe(select(fromPaging.getSpecificationPageCount));
    /** combine all observables to pass into header component */
    this.pagingInputs$ = combineLatest([
      this.adjacentItems$,
      this.pagingItems$,
      this.currentPage$,
      this.pageCount$
    ]);

    /** get route params */
    this.routeParamsSubscription = store
      .select(fromStore.getRouteParams)
      .subscribe((params: Params) => {
        this.selectedNavType = params.selectedNavType;
        this.currentPage = params.currentPage;
    });
    /** get route query params */
    this.routeQueryParamsSubscription = store
      .select(fromStore.getRouteQueryParams)
      .subscribe((params: Params) => {
        this.routeQueryParams = params;
        this.selectedDivision = params.division;
      });
  }

  ngOnInit() {
  }

  /** open pdf viewer */
  openPdfViewer(item: SpecificationThumbnailItem) {
    this.store.dispatch(new ItemFullsizeActions.PdfViewerOpen({ item }));
  }

  /**
   * get next item
   */
  getNextItem() {
    this.store.dispatch(new SpecificationActions.NextSpecificationItem());
    this.store.dispatch(new RouterActions.Go({
      path: [
        'dashboard',
        this.selectedNavType,
        this.currentPage,
        this.adjacentItems[1].url_endpoint
      ],
      query: {division: this.selectedDivision}
    }));
  }

  /**
   * get previous item
   */
  getPrevItem() {
    this.store.dispatch(new SpecificationActions.PrevSpecificationItem());
    this.store.dispatch(new RouterActions.Go({
      path: [
        'dashboard',
        this.selectedNavType,
        this.currentPage,
        this.adjacentItems[0].url_endpoint
      ],
        query: {division: this.selectedDivision}
    }));
  }

  /** get previous page of data */
  getPrevPage() {
    this.currentPage = Number(this.currentPage) - 1;
    this.store.dispatch(new SpecificationActions.PrevSpecificationItemPrevPage());
  }

  /** get next page of data */
  getNextPage() {
    this.currentPage = Number(this.currentPage) + 1;
    this.store.dispatch(new SpecificationActions.NextSpecificationItemNextPage());
  }

  /** Close fullsize component */
  closeFullsize() {
    this.store.dispatch(new SpecificationActions.DeselectSpecificationItem());
    this.store.dispatch(new RouterActions.Go({
      path: ['dashboard', this.selectedNavType, this.currentPage],
      query: {
        ...this.routeQueryParams,
        division: this.selectedDivision
      }
    }));
  }

  /**
   * Associated CA item click handler
   * @param ca CA item that has been clicked
   */
  selectCaItemAlert(caItem: CaThumbnailItem) {
    this.store.dispatch(new CaActions.SelectCaItem({ caItem }));
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.routeQueryParamsSubscription.unsubscribe();
  }
}
