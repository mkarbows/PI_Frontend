import {
  Injectable,
  ChangeDetectionStrategy,
  Component,
  OnDestroy
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExceptionService } from '../../services/exception.service';

import { Observable, combineLatest, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ConfigurationService } from '../../core/configuration.service';
import { PiConfig, GeoDataTypes } from '../../core/app-config';

// actions
import { CaActions, RouterActions, DrawingActions, SpecificationActions } from '../../store';
// models
import { CaThumbnailItem, DrawingThumbnailItem, SpecificationThumbnailItem } from '../../shared/models/item.model';
// reducer
import * as fromStore from '../../store';
// selectors
import * as fromPaging from '../../store/selectors/paging.selector';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-ca-item-fullsize-container',
  templateUrl: './ca-item-fullsize-container.component.html',
  styleUrls: ['./ca-item-fullsize-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaItemFullsizeContainerComponent implements OnDestroy {
  /** api root from config file */
  config: PiConfig = this.configService.getConfig();
  apiRoot: string = this.config.apiRoot;
  geoDataTypes: GeoDataTypes = this.config.geoDataTypes;

  adjacentItems$: Observable<CaThumbnailItem[]>;
  currentPage$: Observable<number>;
  caItem$: Observable<CaThumbnailItem>;
  pageCount$: Observable<number>;
  /** inputs required by the full size header component for paging */
  pagingInputs$: Observable<any>;
  /** first two and last two items in the array of thumbnail items */
  pagingItems$: Observable<CaThumbnailItem[]>;
  adjacentItems: CaThumbnailItem[];
  pagingInputs: any;
  selectedItemType: string;
  selectedNavType: string;
  currentPage: number;
  pagingItems: CaThumbnailItem[];
  pageCount: number;
  /** route parameters */
  routeParamsSubscription: Subscription;
  routeQueryParams: Params;
  routeQueryParamsSubscription: Subscription;

  constructor(
    private configService: ConfigurationService,
    private http: HttpClient,
    private exceptionService: ExceptionService,
    public dialog: MatDialog,
    private store: Store<fromStore.State>
  ) {
    this.caItem$ = this.store.pipe(select(fromStore.getSelectedCaItem));

    /**
     * get item the items either side of the current
     * item in the array of media thumbnails
     */
    this.adjacentItems$ = this.store.pipe(
      select(fromPaging.getAdjacentCaItems),
      tap(adjacentItems => this.adjacentItems = adjacentItems)
    );
    /** get items at start and end of page */
    this.pagingItems$ = this.store.pipe(select(fromPaging.checkCaPagingItems));
    /** get current page */
    this.currentPage$ = this.store.pipe(select(fromStore.getCurrentPage));
    /** get page count */
    this.pageCount$ = this.store.pipe(select(fromPaging.getCaPageCount));
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
        this.selectedItemType = params.type;
    });
  }

  /** download drawing item */
  downloadItem(inputs: any) {
    window.open(
      `${inputs.download}`
    );
  }

  /**
   * Associated CA item click handler
   * @param ca CA item that has been clicked
   */
  selectCaItemAlert(caItem: CaThumbnailItem) {
    this.store.dispatch(new CaActions.SelectCaItem({ caItem }));
  }

  /** get next item */
  getNextItem() {
    this.store.dispatch(new CaActions.NextCaItem());
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

  /** get previous item */
  getPrevItem() {
    this.store.dispatch(new CaActions.PrevCaItem());
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
    this.store.dispatch(new CaActions.PrevCaItemPrevPage());
  }

  /** get next page of data */
  getNextPage() {
    this.currentPage = Number(this.currentPage) + 1;
    this.store.dispatch(new CaActions.NextCaItemNextPage());
  }

  /** Close fullsize component */
  closeFullsize() {
    this.store.dispatch(new CaActions.DeselectCaItem());
    this.store.dispatch(new RouterActions.Go({
      path: ['dashboard', this.selectedNavType, this.currentPage],
      query: {
        ...this.routeQueryParams,
        type: this.selectedItemType
      }
    }));
  }

  /**
   * Associated Drawing item click handler
   * @param drawing Drawing item that has been clicked
   */
  selectDrawingItemAlert(drawingItem: DrawingThumbnailItem) {
    this.store.dispatch(new DrawingActions.SelectDrawingItem({ drawingItem }));
  }

  /**
   * Associated Specification item click handler
   * @param specification Specification item that has been clicked
   */
  selectSpecificationItemAlert(specificationItem: SpecificationThumbnailItem) {
    this.store.dispatch(new SpecificationActions.SelectSpecificationItem({ specificationItem }));
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.routeQueryParamsSubscription.unsubscribe();
  }
}
