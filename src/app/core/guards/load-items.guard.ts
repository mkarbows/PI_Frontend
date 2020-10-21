import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';

// actions
import { CaActions, DrawingActions, MediaActions, SpecificationActions } from '../../store/actions';
// state
import * as fromStore from '../../store';

@Injectable({
  providedIn: 'root'
})
export class LoadItemsGuard implements CanActivate {
  constructor(private store: Store<fromStore.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    /** get selected nav type from route params */
    const selectedNavType = next.params.selectedNavType;
    if (selectedNavType === 'media') {
      this.store.dispatch(new MediaActions.LoadMediaItems());
    } else if (selectedNavType === 'ca') {
      this.store.dispatch(new CaActions.LoadCaItems());
    } else if (selectedNavType === 'drawing') {
      this.store.dispatch(new DrawingActions.LoadDrawingItems());
    } else if (selectedNavType === 'specification') {
      this.store.dispatch(new SpecificationActions.LoadSpecificationItems());
    }
    return true;
  }
}
