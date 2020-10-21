/**
 * @author Arup
 * @description
 * Full size ca item
 **/
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { CaItem, DrawingAssociatedItem, CaItemFile, SpecificationAssociatedItem } from '../../shared/models/item.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeoDataTypes } from 'src/app/core/app-config';

@Component({
  selector: 'app-ca-item-fullsize',
  templateUrl: './ca-item-fullsize.component.html',
  styleUrls: ['./ca-item-fullsize.component.css']
})
export class CaItemFullsizeComponent implements OnInit, OnChanges {
  @Input() caItem: CaItem;
  @Input() loading: boolean;
  @Input() currentEndpoint: string;
  @Input() pagingInputs: any[];
  @Input() selectedNavType: string;
  @Input() selectedItemType: string;
  @Input() adjacentItems: CaItem[];
  @Input() mapMarkerClicked: boolean;
  @Input() geoDataTypes: GeoDataTypes;
  @Output() downloadItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectDrawingItem: EventEmitter<any> = new EventEmitter<any>();
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
  @Output() selectSpecificationItem: EventEmitter<any> = new EventEmitter<any>();

  drawingColumnsToDisplay = [
    'sheet_type',
    'drawing_number',
    'title'
  ];

  specificationColumnsToDisplay = [
    'division',
    'specification_number',
    'title'
  ];

  fileColumnsToDisplay = [
    'file_name',
    'file_path',
    'download'
  ];

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    /** if page is refreshed on a fullsize item, disable prev next buttons */
    if (changes.pagingInputs) {
      if (this.adjacentItems === undefined && this.prevNextItems === undefined) {
        this.prevDisabled = true;
        this.nextDisabled = true;
      }
    }
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

  getType(type: string) {
    if (!type || type === '') {
      return '?';
    }
    return (type.substring(0, 3));
  }

  /**
   * Shorten drawing sheet type for presentation
   * @param sheetType sheet type
   */
  getDrawingSheetTypeShort(sheetType: string) {
    if (sheetType === null) {
      return 'X';
    }
    if (!sheetType || sheetType === '') {
      return '?';
    }
    return (sheetType.substring(0, 2));
  }

  /** download item */
  openItem(file: CaItemFile) {
    this.downloadItem.emit({
      download: file.download
    });
  }

  /**
   * Copy text string
   * @param val the string to copy
   */
  copyString(val: string) {
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
    this.displaySnackBar('Link copied to clipboard');
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
    this.displaySnackBar('File path copied to clipboard');
  }

  /**
   * Display snack bar to user
   * @param message message to display
   */
  displaySnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  /**
   * Change currently selected item to associated drawing item
   * @param drawingItem Drawing to select
   */
  selectAssociatedDrawingItem(drawingItem: DrawingAssociatedItem) {
    this.selectDrawingItem.emit(drawingItem);
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
    /**
     * change currently selected item to associated specification item
     * @param specificationItem specification to seelct
     */
  }
  selectAssociatedSpecificationItem(specificationItem: SpecificationAssociatedItem) {
    this.selectSpecificationItem.emit(specificationItem);
  }
}
