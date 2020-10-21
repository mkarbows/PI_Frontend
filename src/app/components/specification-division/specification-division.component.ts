import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// models
import { Filter } from 'src/app/shared/models/filter.model';

@Component({
  selector: 'app-specification-division',
  templateUrl: './specification-division.component.html',
  styleUrls: ['./specification-division.component.css']
})
export class SpecificationDivisionComponent implements OnInit {
  @Input() specificationDivisionFilters: Filter[];
  @Input() selectedNavType: string;
  @Input() selectedDivision: string;
  @Output() changeDivision = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitChangeDivision(division) {
    this.changeDivision.emit({ selectedDivision: division.value });
  }

}
