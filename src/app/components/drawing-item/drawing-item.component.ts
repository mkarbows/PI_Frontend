/**
 * @author Arup
 * @description
 * Table component for drawing items
 **/

import { Component, EventEmitter, Input, Output } from '@angular/core';

// models
import { DrawingThumbnails } from '../../shared/models/itemthumbnails.model';
import { DrawingThumbnailItem } from '../../shared/models/item.model';
import { GeoDataTypes } from 'src/app/core/app-config';

@Component({
  selector: 'app-drawing-item',
  templateUrl: './drawing-item.component.html',
  styleUrls: ['./drawing-item.component.css']
})
export class DrawingItemComponent {
  @Input() drawingItems: DrawingThumbnails;
  @Input() geoDataTypes: GeoDataTypes;

  @Output() hoverDrawingItem: EventEmitter<string> = new EventEmitter<string>();
  @Output() selectDrawingItem: EventEmitter<any> = new EventEmitter<any>();

  columnsToDisplay = [
    'sheet_type',
    'drawing_number',
    'title',
    'geoData1',
    'level_number',
    'phase',
    'discipline',
    'time'
  ];
  constructor() { }

  /**
   * Shorten sheet type for presentation
   * @param sheetType sheet type
   */
  getSheetTypeShort(sheetType: string) {
    if (!sheetType || sheetType === '') {
      return '?';
    }
    return (sheetType.substring(0, 2));
  }

  /**
   * Table row (drawing item) hover handler
   * @param segmentId the id of the segment associated with the row that is being hovered over
   */
  emitDrawingItemHover(segmentId: string) {
    this.hoverDrawingItem.emit(segmentId);
  }

  /**
   * Table row selection handler
   * @param drawingItem selected drawing item (table row)
   */
  selectItem(drawingItem: DrawingThumbnailItem) {
    this.selectDrawingItem.emit(drawingItem);
  }
}
