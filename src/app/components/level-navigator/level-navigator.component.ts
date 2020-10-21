import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Level } from '../../shared/models/level.model';

@Component({
  selector: 'app-level-navigator',
  templateUrl: './level-navigator.component.html',
  styleUrls: ['./level-navigator.component.css']
})
export class LevelNavigatorComponent {
  @Input() levels: Level[] = [];
  @Input() selectedLevels: string[] = [];
  @Output() changeLevelSelection = new EventEmitter<any>();

  private clickedLevels = [];
  private levelQuery: string;

  constructor() { }

  isSelected(level: Level) {
    return this.selectedLevels.indexOf(level.level_number) >= 0;
  }

  changeLevel(level: Level) {
    this.getLevelQuery(level);
    this.changeLevelSelection.emit({
      level_number: this.levelQuery
    });
  }

  getLevelQuery(level) {
    const l = this.clickedLevels.indexOf(level.level_number);
    if (l < 0) {
      this.clickedLevels.push(level.level_number);
      this.levelQuery = this.clickedLevels.join(',');
    } else {
      this.clickedLevels.splice(l, 1);
      this.levelQuery = this.clickedLevels.join(',');
    }
    if (this.clickedLevels.length === 0) {
      this.levelQuery = 'null';
    }
  }

}
