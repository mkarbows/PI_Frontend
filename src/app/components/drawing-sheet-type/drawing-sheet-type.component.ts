import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

// models
import { Filter } from 'src/app/shared/models/filter.model';

@Component({
  selector: 'app-drawing-sheet-type',
  templateUrl: './drawing-sheet-type.component.html',
  styleUrls: ['./drawing-sheet-type.component.css']
})

export class DrawingSheetTypeComponent {
  @Input() sheetTypeFilters: Filter[];
  @Input() selectedSheetType: string;
  @Output() changeSheetType = new EventEmitter();

  constructor() { }

  emitChangeSheetType(type) {
    this.changeSheetType.emit({ selectedSheetType: type.value });
  }
}
