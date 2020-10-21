import { Component, Input, Output, EventEmitter } from '@angular/core';

// models
import { Filter } from 'src/app/shared/models/filter.model';

@Component({
  selector: 'app-phase-filter',
  templateUrl: './phase-filter.component.html',
  styleUrls: ['./phase-filter.component.css']
})
export class PhaseFilterComponent {

  @Input() phaseFilters: Filter[];
  @Input() selectedPhase: string;
  @Output() changePhaseSelection = new EventEmitter();

  constructor() { }

  emitChangePhase(phase) {
    this.changePhaseSelection.emit({ selectedPhase: phase.value });
  }

}
