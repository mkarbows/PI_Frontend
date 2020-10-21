import { Component, Input, Output, EventEmitter } from '@angular/core';

// models
import { Level } from 'src/app/shared/models/level.model';

@Component({
  selector: 'app-levels-filter',
  templateUrl: './levels-filter.component.html',
  styleUrls: ['./levels-filter.component.css']
})
export class LevelsFilterComponent {
  @Input() levels: Level[];
  @Input() selectedLevel: string;
  @Output() changeLevelSelection = new EventEmitter();

  constructor() { }

  emitChangeLevel(level) {
    this.changeLevelSelection.emit({ selectedLevel: level.value });
  }

}
