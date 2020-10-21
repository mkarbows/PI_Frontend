/**
 * @author Arup
 * @description
 * Full size specification item
 **/

import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
// model
import { SpecificationItem, CaAssociatedItem } from '../../shared/models/item.model';

@Component({
  selector: 'app-specification-item-fullsize',
  templateUrl: './specification-item-fullsize.component.html',
  styleUrls: ['./specification-item-fullsize.component.css']
})
export class SpecificationItemFullsizeComponent implements OnInit, OnChanges {
  @Input() specificationItem: SpecificationItem;
  @Input() apiRoot: string;
  @Input() pagingInputs: any[];

  @Input() adjacentItems: SpecificationItem[];

  /** url_endpoint of the current item */
  @Input() currentEndpoint: string;
  @Output() openPdfViewerEvent: EventEmitter<SpecificationItem> = new EventEmitter<SpecificationItem>();
  @Output() selectCaItem: EventEmitter<any> = new EventEmitter<any>();
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


  public isLoading: boolean;

  caColumnsToDisplay = [
    'type',
    'ca_number',
    'ca_title'
  ];

  constructor() { }

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

  openPdfViewer(specificationItem: SpecificationItem) {
    this.openPdfViewerEvent.emit(specificationItem);
  }

  getCaTypeShort(type: string) {
    if (!type || type === '') {
      return '?';
    }
    return (type.substring(0, 3));
  }

  /**
   * Change currently selected item to associated CA item
   * @param caItem CA item to select
   */
  selectAssociatedCaItem(caItem: CaAssociatedItem) {
    this.selectCaItem.emit(caItem);
  }

  downloadItem() {
    window.open(
      `${this.specificationItem.download}`
    );
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
