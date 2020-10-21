/**
 * @author Arup
 * @description
 * Container for item table component.
 **/
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Params, Router } from '@angular/router';

import { PiConfig, GeoDataTypes } from 'src/app/core/app-config';
import { ConfigurationService } from 'src/app/core/configuration.service';

// actions
import { HeaderFilterActions } from '../../store/actions';

// models
import { DrawingThumbnailItem, SpecificationThumbnailItem, CaThumbnailItem } from '../../shared/models/item.model';
import { DrawingThumbnails, SpecificationThumbnails, CaThumbnails } from 'src/app/shared/models/itemthumbnails.model';

// reducers
import * as fromStore from '../../store';
import { DrawingActions, SpecificationActions, CaActions, RouterActions } from '../../store';

@Component({
  selector: 'app-item-table-container',
  templateUrl: './item-table-container.component.html',
  styleUrls: ['./item-table-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemTableContainerComponent implements OnDestroy {
  /** geoDataTypes from config file */
  config: PiConfig;
  geoDataTypes: GeoDataTypes;

  drawingItems$: Observable<DrawingThumbnails>;
  specificationItems$: Observable<SpecificationThumbnails>;
  caItems$: Observable<CaThumbnails>;
  selectedNavType: string;
  selectedItemType: string;
  currentPage: number;
  /** route parameters */
  routeParamsSubscription: Subscription;
  routeQueryParamsSubscription: Subscription;

  constructor(
    private store: Store<fromStore.State>,
    router: Router,
    private configService: ConfigurationService
  ) {
    this.config = this.configService.getConfig();
    this.geoDataTypes = this.config.geoDataTypes;
    /**
     * reset table scroll to top when the route changes
     */
    router.events.subscribe(() => {
      const table = document.getElementById('table-container');
      if (table) {
        table.scrollTo(0, 0);
      }
    });

    /** get drawing items */
    this.drawingItems$ = this.store.pipe(
      select(fromStore.getDrawingThumbnails)
    );
    /** get specification items */
    this.specificationItems$ = this.store.pipe(
      select(fromStore.getSpecificationThumbnails)
    );
    /** get ca items */
    this.caItems$ = this.store.pipe(select(fromStore.getCaThumbnails));
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
        this.selectedItemType = params.type;
      });
  }

    /**
   * Thumbnail item click handler
   * @param drawing item that has been clicked
   */
  selectDrawingItemAlert(drawingItem: DrawingThumbnailItem) {
    this.store.dispatch(new DrawingActions.SelectDrawingItem({ drawingItem }));
    this.store.dispatch(new RouterActions.Go({ path: ['dashboard', this.selectedNavType, this.currentPage, drawingItem.url_endpoint] }));
  }
  /**
   * Thumbnail item click handler
   * @param specification item that has been clicked
   */
  selectSpecificationItemAlert(specificationItem: SpecificationThumbnailItem) {
    this.store.dispatch(new SpecificationActions.SelectSpecificationItem({ specificationItem }));
    this.store.dispatch(new RouterActions.Go({
      path: ['dashboard', this.selectedNavType, this.currentPage, specificationItem.url_endpoint]
    }));
  }
      /**
   * Thumbnail item click handler
   * @param ca item that has been clicked
   */
  selectCaItemAlert(caItem: CaThumbnailItem) {
    this.store.dispatch(new CaActions.SelectCaItem({ caItem }));
    this.store.dispatch(new RouterActions.Go({ path: ['dashboard', this.selectedNavType, this.currentPage, caItem.url_endpoint] }));
  }
  /**
   * Update the id of the hovered segment in the store
   * @param segmentId the id of the segment associated with the table row that is being hovered over
   */
  hoverDrawingItemAlert(segmentId: string) {
    this.store.dispatch(
      new DrawingActions.HoverDrawingItem( { hoveredItemSegments: [segmentId] })
    );
  }

  /**
   * Update the id of the hovered segment in the store
   * @param segmentId the id of the segment associated with the table row that is being hovered over
   */
  hoverCaItemAlert(segmentIds: string[]) {
    this.store.dispatch(
      new CaActions.HoverCaItem( { hoveredItemSegments: segmentIds })
    );
  }

  /**
   * Reset filters to initial state
   */
  resetFiltersAlert() {
    this.store.dispatch(new HeaderFilterActions.ResetFilters());
    this.store.dispatch(new HeaderFilterActions.HeaderFilterMapInitialState({init: true}));
    this.store.dispatch(new RouterActions.Reset(
      { path: [
        'dashboard',
        this.selectedNavType,
        1
      ],
        query: {type: this.selectedItemType} }
    ));
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.routeQueryParamsSubscription.unsubscribe();
  }
}
