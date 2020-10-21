/**
 * @author Arup
 * @description
 * Container component for fullsize drawing item.
 **/

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
import {
  DrawingActions,
  ItemFullsizeActions,
  RouterActions,
  CaActions
} from '../../store';
// models
import {
  DrawingThumbnailItem,
  CaThumbnailItem
} from '../../shared/models/item.model';
// reducer
import * as fromStore from '../../store';
// selectors
import * as fromPaging from '../../store/selectors/paging.selector';

import { MarkupDeleteDialogComponent } from '../../components/markup-delete-dialog/markup-delete-dialog.component';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-drawing-item-fullsize-container',
  templateUrl: './drawing-item-fullsize-container.component.html',
  styleUrls: ['./drawing-item-fullsize-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawingItemFullsizeContainerComponent implements OnDestroy {
  /** api root from config file */
  config: PiConfig;
  apiRoot: string;
  geoDataTypes: GeoDataTypes;

  /** items adjacent to current item */
  adjacentItems$: Observable<DrawingThumbnailItem[]>;
  currentPage$: Observable<number>;
  drawingItem$: Observable<DrawingThumbnailItem>;
  pageCount$: Observable<number>;
  /** inputs required by the full size header component for paging */
  pagingInputs$: Observable<any>;
  /** first two and last two items in the array of thumbnail items */
  pagingItems$: Observable<DrawingThumbnailItem[]>;
  adjacentItems: DrawingThumbnailItem[];
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
    private http: HttpClient,
    private exceptionService: ExceptionService,
    public dialog: MatDialog,
    private store: Store<fromStore.State>
  ) {
    this.config = this.configService.getConfig();
    this.apiRoot = this.config.apiRoot;
    this.geoDataTypes = this.config.geoDataTypes;

    /** get drawing item from store */
    this.drawingItem$ = this.store.pipe(
      select(fromStore.getSelectedDrawingItem)
    );

    /**
     * get item the items either side of the current
     * item in the array of media thumbnails
     */
    this.adjacentItems$ = this.store.pipe(
      select(fromPaging.getAdjacentDrawingItems),
      tap(adjacentItems => this.adjacentItems = adjacentItems)
    );
    /** get items at start and end of page */
    this.pagingItems$ = this.store.pipe(
      select(fromPaging.checkDrawingPagingItems)
    );
    /** get current page */
    this.currentPage$ = this.store.pipe(select(fromStore.getCurrentPage));
    /** get page count */
    this.pageCount$ = this.store.pipe(select(fromPaging.getDrawingPageCount));
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

  /** open pdf viewer */
  openPdfViewer(item: DrawingThumbnailItem) {
    this.store.dispatch(new ItemFullsizeActions.PdfViewerOpen({ item }));
  }

  /**
   * get next item
   */
  getNextItem() {
    this.store.dispatch(new DrawingActions.NextDrawingItem());
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
    this.store.dispatch(new DrawingActions.PrevDrawingItem());
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
    this.store.dispatch(new DrawingActions.PrevDrawingItemPrevPage());
  }

  /** get next page of data */
  getNextPage() {
    this.currentPage = Number(this.currentPage) + 1;
    this.store.dispatch(new DrawingActions.NextDrawingItemNextPage());
  }

  /** Close fullsize component */
  closeFullsize() {
    this.store.dispatch(new DrawingActions.DeselectDrawingItem());
    this.store.dispatch(new RouterActions.Go({
      path: ['dashboard', this.selectedNavType, this.currentPage],
      query: {
        ...this.routeQueryParams,
        type: this.selectedItemType
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

  /** download markup */
  downloadMarkup(event) {
    const { item, index } = event;
    window.open(
      `${this.apiRoot}/markupfiles/${item.markups[index].url_endpoint}/?viewer=download`
    );
  }

  /** delete markup */
  deleteMarkup(event) {
    const { item, index } = event;
    const dialogRef = this.dialog.open(MarkupDeleteDialogComponent, {
      width: '500px',
      data: { item: item, index: index },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const markupUrl = result;
        this.store.dispatch(
          new ItemFullsizeActions.DeleteMarkupFileAction({ markupUrl })
        );
      }
    });
  }

  /** upload markup */
  uploadMarkupFileSuccess(event) {
    this.store.dispatch(new ItemFullsizeActions.UploadMarkupFileSuccess({ drawingItem: event }));
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.routeQueryParamsSubscription.unsubscribe();
  }
}
