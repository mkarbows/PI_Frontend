/**
 * @author Arup
 * @description
 * Full size drawing item
 **/

import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
// model
import { DrawingItem, CaAssociatedItem } from '../../shared/models/item.model';
import { UploadDialogComponent } from '../markup-upload-dialog/markup-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeoDataTypes } from 'src/app/core/app-config';


@Component({
  selector: 'app-drawing-item-fullsize',
  templateUrl: './drawing-item-fullsize.component.html',
  styleUrls: ['./drawing-item-fullsize.component.css']
})
export class DrawingItemFullsizeComponent implements OnInit, OnChanges {

  @Input() drawingItem: DrawingItem;
  @Input() apiRoot: string;
  @Input() selectedNavType: string;
  @Input() currentEndpoint: string;
  @Input() geoDataTypes: GeoDataTypes;
  /** array of inputs needed for next/prev logic */
  @Input() pagingInputs: any[];
  @Input() selectedItemType: string;
  @Input() title: string;
  @Input() adjacentItems: DrawingItem[];
  @Input() mapMarkerClicked: boolean;

  @Output() deleteMarkupEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() downloadMarkupEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() uploadMarkupFileSuccess: EventEmitter<DrawingItem> = new EventEmitter<DrawingItem>();
  @Output() selectCaItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() openPdfViewerEvent: EventEmitter<DrawingItem> = new EventEmitter<DrawingItem>();
  @Output() closeFullsizeComponent: EventEmitter<any> = new EventEmitter();
  @Output() getNextItem: EventEmitter<any> = new EventEmitter();
  @Output() getNextPage: EventEmitter<any> = new EventEmitter();
  @Output() getPrevItem: EventEmitter<any> = new EventEmitter();
  @Output() getPrevPage: EventEmitter<any> = new EventEmitter();

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

  caColumnsToDisplay = [
    'type',
    'ca_number',
    'ca_title'
  ];

  markupColumnsToDisplay = [
    'title',
    'username',
    'time',
    'comments',
    'download'
  ];

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  public isLoading: boolean;

  ngOnInit() {
    this.isLoading = true;
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

  openPdfViewer(drawingItem: DrawingItem) {
    this.openPdfViewerEvent.emit(drawingItem);
  }

  getSheetTypeShort(sheetType: string) {
    if (!sheetType || sheetType === '') {
      return '?';
    }
    return (sheetType.substring(0, 2));
  }

  getCaTypeShort(type: string) {
    if (!type || type === '') {
      return '?';
    }
    return (type.substring(0, 3));
  }

  getLayerDisplay(item) {
    if (item.level_number) {
      return item.level_number + ' - ' + item.level_name;
    } else {
      return '';
    }
  }

  displaySnackBar(message: string, milleseconds: number) {
    this._snackBar.open(message, 'Close', {
      duration: milleseconds,
    });
  }

  downloadMarkup(item: DrawingItem, index: number) {
    this.downloadMarkupEvent.emit({item, index});
  }

  deleteMarkup(item: DrawingItem, index: number) {
    this.deleteMarkupEvent.emit({item, index});
  }

  uploadMarkup(drawingUrl: string, drawingNumber: string) {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '500px',
      data: { url: drawingUrl, number: drawingNumber }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.uploadMarkupFileSuccess.emit(result.data);
        this.displaySnackBar(result.status.message, 5000);
      }
    });
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

  downloadItem() {
    window.open(
      `${this.drawingItem.download}`
    );
  }

  /**
   * Change currently selected item to associated CA item
   * @param caItem CA item to select
   */
  selectAssociatedCaItem(caItem: CaAssociatedItem) {
    this.selectCaItem.emit(caItem);
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
}
