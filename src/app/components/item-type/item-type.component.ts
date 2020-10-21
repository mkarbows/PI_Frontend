import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

// models
import { Filter } from 'src/app/shared/models/filter.model';

@Component({
  selector: 'app-item-type',
  templateUrl: './item-type.component.html',
  styleUrls: ['./item-type.component.css']
})
export class ItemTypeComponent {
  @Input() itemTypeFilters: Filter[];
  @Input() selectedNavType: string;
  @Input() selectedItemType: string;
  @Output() changeItemType = new EventEmitter();

  constructor() { }

  emitChangeItemType(type) {
    this.changeItemType.emit({ selectedItemType: type.value });
  }

}
