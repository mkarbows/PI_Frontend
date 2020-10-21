import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

// models
import { Filter } from 'src/app/shared/models/filter.model';

@Component({
  selector: 'app-discipline-filter',
  templateUrl: './discipline-filter.component.html',
  styleUrls: ['./discipline-filter.component.css']
})
export class DisciplineFilterComponent {

  @Input() disciplineFilters: Filter[];
  @Input() selectedDiscipline: string;
  @Output() changeDiscplineSelection = new EventEmitter();

  constructor() { }

  emitChangeDiscipline(discipline) {
    this.changeDiscplineSelection.emit({ selectedDiscipline: discipline.value });
  }
}
