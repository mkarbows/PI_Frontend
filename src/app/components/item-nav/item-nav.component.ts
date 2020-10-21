import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { NavTypes, GeoDataTypes } from 'src/app/core/app-config';

@Component({
  selector: 'app-item-nav',
  templateUrl: './item-nav.component.html',
  styleUrls: ['./item-nav.component.css']
})
export class ItemNavComponent implements OnInit {
  @Input() navTypes: NavTypes;
  @Input() geoDataTypes: GeoDataTypes;
  @Input() currentPage: number;
  @Input() selectedNavType: string;
  @Input() selectedItemType: string;
  @Input() selectedTerminal: string;
  @Input() selectedPhase: string;
  @Input() selectedDiscipline: string;
  @Input() selectedLevel: string;
  @Input() filteredSegment: string;
  @Input() selectedStartDate: string;
  @Input() selectedEndDate: string;
  @Output() changeNavType = new EventEmitter();
  query: any;

  ngOnInit() {
    this.query = {
      type: this.selectedItemType,
      [this.geoDataTypes.geoData1]: this.selectedTerminal,
      phase: this.selectedPhase,
      discipline: this.selectedDiscipline,
      level: this.selectedLevel,
      segment: this.filteredSegment,
      start_date: this.selectedStartDate,
      end_date: this.selectedEndDate
    };
  }

  emitChangeNavType(selectedNavType: string) {
    this.changeNavType.emit({ selectedNavType });
  }
}
