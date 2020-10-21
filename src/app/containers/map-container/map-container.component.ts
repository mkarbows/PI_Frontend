import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

import { MapActions, MediaActions, RightPanelActions, RouterActions, HeaderFilterActions } from '../../store/actions';

import { Level } from '../../shared/models/level.model';

import * as fromStore from '../../store';
// config
import { PiConfig, MapConfig, GeoDataTypes } from '../../core/app-config';
// services
import { ConfigurationService } from '../../core/configuration.service';


@Component({
  selector: 'app-map-container',
  templateUrl: './map-container.component.html',
  styleUrls: ['./map-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapContainerComponent implements OnInit, OnDestroy {
  segments$: Observable<any>;
  mapData$: Observable<any>;
  currentItemSegments$: Observable<string[]>;
  selectedItemType$: Observable<string>;
  currentPage$: Observable<any>;
  mediaItem$: Observable<any>;
  mediaItemHover$: Observable<string>;
  hoveredItemSegments$: Observable<any>;
  selectedNavType$: Observable<any>;
  zoomToSelection$: Observable<boolean>;
  resetMapInitialState$: Observable<boolean>;
  levels$: Observable<Level[]>;
  darkMode$: Observable<boolean>;
  currentPageSubscription: Subscription;
  navType: string;
  currentPage: number;
  filteredSegment$: Observable<string>;
  config: PiConfig;
  mapConfig: MapConfig;
  geoDataTypes: GeoDataTypes;

  mapLoadedEvent(status: boolean) {
    console.log('The map loaded: ' + status);
  }
  selectMapSegmentAlert(geoData2) {
    this.store.dispatch(new RouterActions.Go({
      path: ['dashboard', this.navType, 1],
      query: {
        [this.geoDataTypes.geoData2]: geoData2
      }
    }));
  }
  changePageAlert(page) {
    this.store.dispatch(new RightPanelActions.ChangePage(page));
  }

  zoomToSelectionAlert(setting: boolean) {
    this.store.dispatch(new HeaderFilterActions.ZoomToSelection({zoomToSelection: setting})); // TODO: move to MapActions
  }

  selectMapMarker(item) {
    this.store.dispatch(new MediaActions.SelectMediaItem(item));
    this.store.dispatch(new MapActions.MapMarkerSelect({
      mediaItem: item,
      mapMarkerClicked: true
    }));
    this.store.dispatch(new RouterActions.Go({
      path: ['dashboard', this.navType, this.currentPage, item.mediaItem.url_endpoint]
    }));
  }
  mapMarkerHoverAlert(markerHoverId: string) {
    this.store.dispatch(new MapActions.MapMarkerHover({ itemId: markerHoverId }));
  }
  alertMapInitialState(init) {
    this.store.dispatch(new MapActions.MapInitialState(init));
  }

  constructor(
    private configService: ConfigurationService,
    private store: Store<fromStore.State>,
  ) {
    this.segments$ = this.store.pipe(
      select(fromStore.getSegments)
    );
    this.mapData$ = this.store.pipe(
      select(fromStore.getMapData)
    );
    this.currentItemSegments$ = this.store.pipe(
      select(fromStore.getCurrentItemSegments)
    );
    this.selectedItemType$ = this.store.pipe(
      select(fromStore.getSelectedItemType),
    );
    this.mediaItem$ = this.store.pipe(
      select(fromStore.getSelectedMediaItem)
    );
    this.mediaItemHover$ = this.store.pipe(
      select(fromStore.getHoveredItemId)
    );
    this.hoveredItemSegments$ = this.store.pipe(
      select(fromStore.getHoveredItemSegments)
    );
    this.selectedNavType$ = this.store.pipe(
      select(fromStore.getSelectedNavType),
      tap(navType => this.navType = navType)
    );
    this.zoomToSelection$ = this.store.pipe(
      select(fromStore.getZoomToSelection)
    );
    this.resetMapInitialState$ = this.store.pipe(
      select(fromStore.getMapInitialState)
    );
    this.levels$ = this.store.pipe(
      select(fromStore.getLevels)
    );

    this.darkMode$ = this.store.pipe(
      select(fromStore.getDarkMode)
    );
    this.filteredSegment$ = this.store.pipe(
      select(fromStore.getFilteredSegment)
    );
    this.currentPageSubscription = this.store
      .select(fromStore.getCurrentPage)
      .subscribe(page => this.currentPage = page
    );

  }

  ngOnInit() {
    this.config = this.configService.getConfig();
    this.mapConfig = this.config.mapConfig;
    this.geoDataTypes = this.config.geoDataTypes;
  }

  ngOnDestroy() {
    this.currentPageSubscription.unsubscribe();
  }
}
