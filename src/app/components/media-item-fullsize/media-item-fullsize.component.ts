/**
 * @author Arup
 * @description
 * Full size media item component
 **/

import {
  Injectable,
  Component,
  EventEmitter,
  OnInit,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  AfterViewInit
} from '@angular/core';

import { MediaItem } from '../../shared/models/item.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as PhotoSphereViewer from 'photo-sphere-viewer';
import { GeoDataTypes } from 'src/app/core/app-config';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-media-item-fullsize',
  templateUrl: './media-item-fullsize.component.html',
  styleUrls: ['./media-item-fullsize.component.css']
})
export class MediaItemFullsizeComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() mediaItem: MediaItem;
  @Input() apiRoot: string;
  @Input() geoDataTypes: GeoDataTypes;
  @Input() selectedNavType: string;
  @Input() currentEndpoint: string;
  @Output() openModalEvent: EventEmitter<MediaItem> = new EventEmitter<MediaItem>();
   /** array of inputs needed for next/prev logic */
  @Input() pagingInputs: any[];
  @Input() selectedItemType: string;
  @Input() title: string;
  @Input() adjacentItems: MediaItem[];
  @Input() mapMarkerClicked: boolean;
  @Output() getNextItem: EventEmitter<any> = new EventEmitter();
  @Output() getNextPage: EventEmitter<any> = new EventEmitter();
  @Output() getPrevItem: EventEmitter<any> = new EventEmitter();
  @Output() getPrevPage: EventEmitter<any> = new EventEmitter();

  psv: PhotoSphereViewer;
  mediaItemUrl: string;

  /** adjacent items */
  prevNextItems: any[];
  /** first 2 and last 2 items in current page data */
  pagingItems: any[];
  currentPage: number;
  pageCount: number;
  prevDisabled = false;
  nextDisabled = false;
  /** url_endpoint of the previous item */
  previousItemEndpoint = '';
  /** url_endpoint of the next item */
  nextItemEndpoint = '';

  constructor(
    private _snackBar: MatSnackBar
  ) {}

  public isLoading: boolean;

  ngOnInit() {
    this.isLoading = true;
  }

  ngAfterViewInit() {
    if (this.mediaItem.type === 'pano') {
      document.getElementById('photosphereviewer').innerHTML = '';
      this.mediaItemUrl = this.mediaItem.stream;
      this.createViewer();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.loading) {
      this.isLoading = !changes.loading.currentValue;
    }
    /** if page is refreshed on a fullsize item, disable prev next buttons */
    if (changes.pagingInputs) {
      if (this.adjacentItems === undefined && this.prevNextItems === undefined) {
        this.prevDisabled = true;
        this.nextDisabled = true;
      }
    }
     /** if a mapMarker is clicked then disable the prev/next item buttons */
     if (changes.mapMarkerClicked &&
      changes.mapMarkerClicked.currentValue === true) {
      this.prevDisabled = true;
      this.nextDisabled = true;
    } else if (
      changes.pagingInputs &&
      changes.pagingInputs.currentValue[0] !== undefined
      ) {
      /** adjacent items */
      this.prevNextItems = changes.pagingInputs.currentValue[0];
      /** first and last 2 items from thumbnail array */
      this.pagingItems = changes.pagingInputs.currentValue[1];
      this.currentPage = changes.pagingInputs.currentValue[2];
      this.pageCount = changes.pagingInputs.currentValue[3];
      const lastItem = this.pagingItems[3];
      /** get url_endpoints to use in html template router links */
      this.previousItemEndpoint =
        this.prevNextItems[0] === undefined
          ? ''
          : this.prevNextItems[0].url_endpoint;
      this.nextItemEndpoint =
        this.prevNextItems[1] === undefined
          ? ''
          : this.prevNextItems[1].url_endpoint;

      /** logic to set enabled/disabled state of prev/next buttons */
      if (this.adjacentItems[0] === undefined && this.pagingInputs[2] === '1') {
        this.prevDisabled = true;
      } else if (
        this.currentEndpoint === this.pagingInputs[0].url_endpoint &&
        this.currentPage === 1
      ) {
        this.prevDisabled = true;
      } else if (
        this.adjacentItems[1] === undefined &&
        Number(this.currentPage) === this.pageCount
      ) {
        this.nextDisabled = true;
      } else if (this.prevNextItems.length === 0) {
        this.prevDisabled = true;
        this.nextDisabled = true;
      } else {
        this.prevDisabled = false;
        this.nextDisabled = false;
      }

    }
  }

  showSpinner(evt) {
    if (!evt) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
  }

  getLayerDisplay(item) {
    if (item.level_number) {
      return item.level_number + ' - ' + item.level_name;
    } else {
      return '';
    }
  }

  openModal(mediaItem: MediaItem) {
    this.openModalEvent.emit(mediaItem);
  }

  copyPath(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.displaySnackBar('File path copied to clipboard', 3000);
  }

  displaySnackBar(message: string, milleseconds: number) {
    this._snackBar.open(message, 'Close', {
      duration: milleseconds,
    });
  }

  createViewer() {
    this.psv = new PhotoSphereViewer({
      container: 'photosphereviewer',
      panorama: this.mediaItemUrl,
      navbar: [
        'zoom', 'caption', 'fullscreen',
      ],
      default_fov: 100,
      time_anim: false,
      touchmove_two_fingers: true,
    });
  }

  /**
   * Get next item or page
   */
  next() {
    if (
      this.prevNextItems.length > 0 &&
      this.prevNextItems[1] === undefined &&
      this.prevNextItems[0].url_endpoint === this.pagingItems[2].url_endpoint
    ) {
      /**
       * if next adjacent item is undefined and previous adjacent item
       * equals the penultimate item, we're near the end of the current
       * array of items so need to fetch a new page.
       */
      this.getNextPage.emit();
    } else {
      /**
       * get the next item.  Enable the previous item button
       * as we can't be at the first item
       */
      this.getNextItem.emit();
      this.prevDisabled = false;
    }
  }

  /**
   * Get previous item or page
   */
  previous() {
    /**
     * if previous item is undefined and next item endpoint
     * equals second item in array of thumbnails, and we're
     * not on the first page, get the previous page of data
     */
    if (
      this.prevNextItems[0] === undefined &&
      this.prevNextItems[1].url_endpoint === this.pagingItems[1].url_endpoint &&
      this.currentPage !== 1
    ) {
      this.getPrevPage.emit();
    } else {
      /**
       * get the previous item from the current page
       * of data
       */
      this.nextDisabled = false;
      this.getPrevItem.emit();
    }
}

  downloadItem() {
    window.open(
      `${this.mediaItem.download}`
    );
  }

}
