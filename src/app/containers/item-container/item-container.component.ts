/**
 * @author Arup
 * @description
 * Container for other item container components.
 * Item container components are rendered conditionally
 * on the selectedNavType
 **/

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

// reducers
import * as fromStore from '../../store';

@Component({
  selector: 'app-item-container',
  templateUrl: './item-container.component.html',
  styleUrls: ['./item-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemContainerComponent {
  fileCount$: Observable<number>;
  selectedNavType$: Observable<string>;
  currentPage$: Observable<number>;

  constructor(private store: Store<fromStore.State>) {
    /** get total number of files */
    this.fileCount$ = this.store.pipe(select(fromStore.getFileCount));
    /** get selected nav type */
    this.selectedNavType$ = this.store.pipe(select(fromStore.getSelectedNavType));
    /** get current page */
    this.currentPage$ = this.store.pipe(select(fromStore.getCurrentPage));
  }
}
