/**
 * @author Arup
 * @description
 * This route guard handles legacy urls that include the file types
 * photo/pano/video.  If a url has any of these, this guard changes
 * the route to use the 'media' type.
 **/
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';

// actions
import { RouterActions } from '../../store/actions';
// state
import * as fromStore from '../../store';

@Injectable({ providedIn: 'root' })
export class NavTypeGuard implements CanActivate {
  constructor(private router: Router, private store: Store<fromStore.State>) {}

  /**
   * Activate the route by either returning true if the nav type is
   * valid, or return a new url tree with the correct url, switching
   * out pano/photo/video for media.  Also sets the nav type in state.
   *
   * If the route has an item id make sure that is also set in state.
   *
   * @param next The route that the app is trying to navigate to
   * @param current The current route (or state of route..)
   */
  canActivate(next: ActivatedRouteSnapshot, current: RouterStateSnapshot) {
    /** get selected nav type from route params */
    let selectedNavType = next.params.selectedNavType;
    const currentPage = next.params.currentPage;
    const urlEndpoint = next.params.itemUrlEndpoint;
    /**
     * define default url for any routes that have disallowed types
     */
    let url = 'dashboard/media';
    /**
     * if nav type is pano, photo or video redirect to media. if it's anything else, carry on
     */
    if (selectedNavType === 'pano' || selectedNavType === 'photo' || selectedNavType === 'video') {
      selectedNavType = 'media';
      /**
       * check if there is an item id and if so set in state and append item id to url
       */
      if (urlEndpoint) {
        /**
         * at this point we don't know the title of the item, only its id/url endpoint.  Set item by type
         */
        url = url + `/${urlEndpoint}`;
      }
      /** create new url tree (route) and navigate to it */
      return this.router.createUrlTree([url]);
    } else if (!next.queryParams.type && selectedNavType !== 'specification') {
      /**
      * define default type
      */
      const query = { };
      if (selectedNavType === 'media') {
        query['type'] = 'photo';
      } else if (selectedNavType === 'drawing') {
        query['type'] = 'progress';
      } else if (selectedNavType === 'ca') {
        query['type'] = 'rfi';
      }
      /**
      * route to new url
      */
      this.store.dispatch(new RouterActions.Go(
        { path: ['dashboard', selectedNavType, currentPage], query }
      ));
    } else if (selectedNavType === 'specification' && !next.queryParams.hasOwnProperty('division')) {
      const query = {
          // pass empty string into the query because division should default to select all
          division: ''
      };
      this.store.dispatch(new RouterActions.Go(
        { path: ['dashboard', selectedNavType, currentPage], query }
      ));
    } else {
      return true;
    }
  }
}
