/**
 * @author Arup
 * @description
 * This route guard handles the header filters
 * If there are no filters in the route then the filters will
 * default to "select all"
 **/
import { Injectable, OnDestroy } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  NavigationStart,
  Event as NavigationEvent
} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

// state
import * as fromStore from '../../store';
// actions
import { RouterActions } from '../../store/actions';

@Injectable({
  providedIn: 'root'
})

export class FilterGuard implements CanActivate, OnDestroy {
  private routerSubscription: any;

  constructor(private store: Store<fromStore.State>, private router: Router) {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          ( event: NavigationEvent ) => {
            return( event instanceof NavigationStart );
          }
        )
      ).subscribe((event: NavigationStart) => {
        if ( event.restoredState ) {
            console.warn(
                'restoring navigation id:',
                event.restoredState.navigationId
            );
        }
        console.groupEnd();
      });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean> {
    const discipline = route.paramMap.get('discipline');

    if (discipline) {

    }
    return of(true);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
