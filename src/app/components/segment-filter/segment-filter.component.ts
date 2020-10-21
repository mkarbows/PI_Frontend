import { Component, Input, Output, EventEmitter } from '@angular/core';

// models
import { Filter } from 'src/app/shared/models/filter.model';
import { GeoDataTypes } from 'src/app/core/app-config';

@Component({
  selector: 'app-segment-filter',
  templateUrl: './segment-filter.component.html',
  styleUrls: ['./segment-filter.component.css']
})
export class SegmentFilterComponent {

  @Input() segmentFilters: Filter[];
  @Input() filteredSegment: string;
  @Input() geoDataTypes: GeoDataTypes;
  @Output() changeSegmentSelection = new EventEmitter();

  constructor() {  }

  emitChangeSegment(segment) {
    this.changeSegmentSelection.emit({ filteredSegment: segment.value});
  }

}
