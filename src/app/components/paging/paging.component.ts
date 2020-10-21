import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent {
  @Input() pageItemCount: number;
  @Input() currentPage: number;

  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  pageEvent: PageEvent;

  onPaginateChange(event) {
    const page = event.pageIndex + 1;
    this.changePage.emit(page);
  }

  constructor() {}

}
