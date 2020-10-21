import { Component, Input, Output, EventEmitter } from '@angular/core';
// google analytics
declare let ga: Function;

@Component({
  selector: 'app-reset-filters',
  templateUrl: './reset-filters.component.html',
  styleUrls: ['./reset-filters.component.css']
})
export class ResetFiltersComponent {
  @Input() selectedTerminal: string;
  @Input() selectedPhase: string;
  @Input() selectedDiscipline: string;
  @Input() selectedLevel: string;
  @Input() filteredSegment: string;
  @Input() selectedStartDate: string;
  @Input() selectedEndDate: string;
  @Output() resetFilters = new EventEmitter();

  constructor() { }

  resetMap() {
    this.resetFilters.emit();
    // google analytics
    ga('send', 'event', {
      eventCategory: 'Reset filters',
      eventLabel: 'Reset button clicked',
      eventAction: 'Reset'
    });
  }

}
