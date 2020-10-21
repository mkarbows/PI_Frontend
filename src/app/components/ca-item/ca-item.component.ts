/**
 * @author Arup
 * @description
 * Ca item
 **/
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { CaThumbnails } from '../../shared/models/itemthumbnails.model';
import { CaThumbnailItem } from '../../shared/models/item.model';
import { GeoDataTypes } from 'src/app/core/app-config';

@Component({
  selector: 'app-ca-item',
  templateUrl: './ca-item.component.html',
  styleUrls: ['./ca-item.component.css']
})
export class CaItemComponent implements OnInit {
  @Input() caItems: CaThumbnails;
  @Input() geoDataTypes: GeoDataTypes;
  @Output() hoverCaItem: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() selectCaItem: EventEmitter<any> = new EventEmitter<any>();


  columnsToDisplay = [
    'type',
    'ca_number',
    'ca_title',
    'geoData1',
    'level_number',
    'phase',
    'discipline',
    'status',
    'time'
  ];

  constructor() { }

  ngOnInit() {
  }

  getTypeShort(type: string) {
    if (!type || type === '') {
      return '?';
    }
    return (type.substring(0, 3));
  }

  /**
   * Table row (CA item) hover handler
   * @param segmentIds the id of the segment associated with the row that is being hovered over
   */
  emitHoverCaItem(segmentIds: string[]) {
    this.hoverCaItem.emit(segmentIds);
  }

  selectItem(caItem: CaThumbnailItem) {
    this.selectCaItem.emit(caItem);
  }

}
