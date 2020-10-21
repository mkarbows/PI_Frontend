import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Event as NavigationEvent,
  NavigationStart,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';

@Injectable({
  providedIn: 'root'
})

export class ItemNavGuard implements CanActivate, OnDestroy {
  private navigationTrigger: string;
  private routerSubscription: any;

  constructor(private store: Store<fromStore.State>, private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event: NavigationEvent) => {
            return (event instanceof NavigationStart);
          }
        )
      )
      .subscribe(
        (event: NavigationStart) => {
          this.navigationTrigger = event.navigationTrigger;
          if (event.restoredState) {
            console.warn(
              'restoring navigation id:',
              event.restoredState.navigationId
            );
          }
          console.groupEnd();
        }
      );
  }

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | boolean {
    return of(true);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
