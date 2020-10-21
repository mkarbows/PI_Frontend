/**
 * @author Arup
 * @description
 * Container for item grid component.
 **/
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Params, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MediaUploadDialogComponent } from '../../components/media-upload-dialog/media-upload-dialog.component';

import { PiConfig, GeoDataTypes } from 'src/app/core/app-config';
import { ConfigurationService } from 'src/app/core/configuration.service';

// actions
import { MediaActions, RouterActions, HeaderFilterActions, MapActions } from '../../store/actions';
// models
import { MediaThumbnails } from '../../shared/models/itemthumbnails.model';
import { MediaThumbnailItem } from '../../shared/models/item.model';
// reducers
import * as fromStore from '../../store';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadMediaItem } from 'src/app/store/actions/media.actions';

@Component({
  selector: 'app-item-grid-container',
  templateUrl: './item-grid-container.component.html',
  styleUrls: ['./item-grid-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemGridContainerComponent implements OnDestroy {
  /** geoDataTypes from config file */
  config: PiConfig;
  geoDataTypes: GeoDataTypes;

  selectedNavType: string;
  currentPage: number;
  thumbnails$: Observable<MediaThumbnails>;
  levels$: Observable<any>;
  disciplines$: Observable<any>;
  mapMarkerHoverId$: Observable<string>;
  selectedItemType: string;
  /** route parameters */
  routeParamsSubscription: Subscription;
  routeQueryParamsSubscription: Subscription;

  constructor(
    private store: Store<fromStore.State>,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private configService: ConfigurationService
  ) {
    this.config = this.configService.getConfig();
    this.geoDataTypes = this.config.geoDataTypes;
    /**
     * reset grid scroll to top when the route changes
     */
    router.events.subscribe(() => {
      const rightPanelCard = document.getElementById('right-panel-card');
      if (rightPanelCard) {
        rightPanelCard.scrollTo(0, 0);
      }
    });

    /** get the currently hovered item id from store */
    this.mapMarkerHoverId$ = this.store.pipe(
      select(fromStore.getHoveredItemId)
    );
    /** get thumbnails from store */
    this.thumbnails$ = this.store.pipe(select(fromStore.getMediaThumbnails));

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
    /** get level filters */
    this.levels$ = this.store.pipe(
      select(fromStore.getLevels)
    );
    /** get discipline filters */
    this.disciplines$ = this.store.pipe(
      select(fromStore.getLevels)
    );
  }

  /**
   *  Media item hover handler.
   *  Set the hovered item id and segment on the store.
   * @param mediaItem media item object
   */
  mediaItemHoverAlert(mediaItem: MediaThumbnailItem) {
    if (mediaItem) {
      this.store.dispatch(
        new MediaActions.MediaItemHover({
          itemId: mediaItem.url_endpoint,
          hoveredItemSegments: mediaItem.geodata[this.geoDataTypes.geoData2]
        })
      );
    } else {
      this.store.dispatch(
        new MediaActions.MediaItemHover({
          itemId: null,
          hoveredItemSegments: []
        })
      );
    }
  }
  /**
   * Thumbnail item click handler
   * @param mediaItem item that has been clicked
   */
  selectItemAlert(mediaItem: MediaThumbnailItem) {
    this.store.dispatch(new MediaActions.SelectMediaItem({ mediaItem }));
    /** set mapMarkerClicked to false because an meida item card was selected */
    this.store.dispatch(new MapActions.MapMarkerSelect({
      mediaItem: mediaItem,
      mapMarkerClicked: false
    }));
    this.store.dispatch(new RouterActions.Go({ path: ['dashboard', this.selectedNavType, this.currentPage, mediaItem.url_endpoint] }));
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

  displaySnackBar(message: string, milleseconds: number) {
    this._snackBar.open(message, 'Close', {
      duration: milleseconds,
    });
  }

  openMediaUploadDialog(mediaUrl: string): void {
    const dialogRef = this.dialog.open(MediaUploadDialogComponent, {
      width: '550px',
      data: {},
      height: 'auto'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.uploadMediaItem(result.file);
        this.displaySnackBar('Upload successful', 5000);
      }
    });
  }

  uploadMediaItem(mediaItem) {
    this.store.dispatch(new MediaActions.UploadMediaItem({ mediaItem: mediaItem }));
  }
  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.routeQueryParamsSubscription.unsubscribe();
  }
}
