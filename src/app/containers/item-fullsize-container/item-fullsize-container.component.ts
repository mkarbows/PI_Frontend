import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromStore from '../../store';

@Component({
  selector: 'app-item-fullsize-container',
  templateUrl: './item-fullsize-container.component.html',
  styleUrls: ['./item-fullsize-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemFullsizeContainerComponent {
  selectedNavType$: Observable<string>;

  constructor(private store: Store<fromStore.State>) {
    /** get selected nav type */
    this.selectedNavType$ = this.store.pipe(
      select(fromStore.getSelectedNavType)
    );
  }
}
