import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-no-results',
  templateUrl: './item-no-results.component.html',
  styleUrls: ['./item-no-results.component.css']
})
export class ItemNoResultsComponent {

  @Input() selectedNavType: string;
  @Output() resetFilters = new EventEmitter();

  constructor(
    private router: Router
  ) {  }

  resetMap() {
    this.resetFilters.emit();
  }

}
