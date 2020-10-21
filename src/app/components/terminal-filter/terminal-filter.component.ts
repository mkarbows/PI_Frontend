import { Component, Input, Output, EventEmitter } from '@angular/core';

// models
import { Filter } from 'src/app/shared/models/filter.model';
import { GeoDataTypes } from 'src/app/core/app-config';

@Component({
  selector: 'app-terminal-filter',
  templateUrl: './terminal-filter.component.html',
  styleUrls: ['./terminal-filter.component.css']
})
export class TerminalFilterComponent {

  @Input() terminalFilters: Filter[];
  @Input() selectedTerminal: string;
  @Input() geoDataTypes: GeoDataTypes;
  @Output() changeTerminalSelection = new EventEmitter();

  constructor() { }

  emitChangeTerminal(terminal) {
    this.changeTerminalSelection.emit({ selectedTerminal: terminal.value });
  }

}
