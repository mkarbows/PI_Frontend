/**
 * @author Arup
 * @description
 * Table component for specification items
 **/

import { Component, EventEmitter, Input, Output } from '@angular/core';

// models
import { SpecificationThumbnails } from '../../shared/models/itemthumbnails.model';
import { SpecificationThumbnailItem } from '../../shared/models/item.model';

@Component({
  selector: 'app-specification-item',
  templateUrl: './specification-item.component.html',
  styleUrls: ['./specification-item.component.css']
})
export class SpecificationItemComponent {
  @Input() specificationItems: SpecificationThumbnails;
  @Output() specificationItemHover: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectSpecificationItem: EventEmitter<any> = new EventEmitter<any>();


  columnsToDisplay = [
    'division',
    'spec_number',
    'spec_title',
    'discipline',
    'phase_group',
    'date_last_modified'
  ];
  constructor() { }

  /**
   * Table row selection handler
   * @param specificationItem selected specification item (table row)
   */
  selectItem(specificationItem: SpecificationThumbnailItem) {
    this.selectSpecificationItem.emit(specificationItem);
  }

}
