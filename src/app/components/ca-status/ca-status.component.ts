import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

// models
import { Filter } from 'src/app/shared/models/filter.model';

@Component({
  selector: 'app-ca-status',
  templateUrl: './ca-status.component.html',
  styleUrls: ['./ca-status.component.css']
})

export class CaStatusComponent {
  @Input() caStatusFilters: Filter[];
  @Input() selectedCaStatus: string;
  @Output() changeCaStatus = new EventEmitter();

  constructor() { }

  emitChangeCaStatus(status: string) {
    this.changeCaStatus.emit({ selectedCaStatus: status });
  }
}
