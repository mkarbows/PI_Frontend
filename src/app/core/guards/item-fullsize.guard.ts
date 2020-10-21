import { Injectable, OnDestroy} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  NavigationStart,
  Event as NavigationEvent
} from '@angular/router';

import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { PiConfig, GeoDataTypes } from 'src/app/core/app-config';
import { ConfigurationService } from 'src/app/core/configuration.service';

import * as fromStore from '../../store';
import { RouterActions, CaActions, MediaActions, DrawingActions, SpecificationActions } from '../../store/actions';
import { CaThumbnailItem, MediaThumbnailItem, DrawingThumbnailItem, SpecificationThumbnailItem } from 'src/app/shared/models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemFullsizeGuard implements CanActivate, OnDestroy {
  private routerSubscription: any;
  public config: PiConfig;
  public geoDataTypes: GeoDataTypes;

  constructor(
    private store: Store<fromStore.State>,
    private router: Router,
    private configService: ConfigurationService
  ) {
    this.config = this.configService.getConfig();
    this.geoDataTypes = this.config.geoDataTypes;

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
    const id = route.paramMap.get('itemUrlEndpoint');
    const selectedNavType = route.paramMap.get('selectedNavType');
    const thirdParam = route.paramMap.get('currentPage');
    /**
     * if there is no item in the store,
     * or the url_endpoint of what is in
     * the store doesn't match the route
     * then set it in the store.
     * The route id won't match the store
     * id when the user is clicking the
     * browser back/forward buttons
     */
    /** set item depending on selectedNavType */
    if (selectedNavType === 'drawing') {
      /** create a drawing item */
      const drawingItem: DrawingThumbnailItem = {
        url_endpoint: id,
        level_number: undefined,
        phase: undefined,
        discipline: undefined,
        time: undefined,
        markups: undefined,
        sheet_type: undefined,
        sheet_type_id: undefined,
        drawing_number: undefined,
        title: undefined,
        type: undefined,
        geodata: {
          [this.geoDataTypes.geoData1]: [],
          [this.geoDataTypes.geoData2]: []
        }
      };
      if (id) {
        this.store.dispatch(
          new DrawingActions.SelectDrawingItem({
            drawingItem
          })
        );
      }
    } else if (selectedNavType === 'media') {
      const mediaItem: MediaThumbnailItem = {
        title: undefined,
        url_endpoint: id,
        type: undefined,
        geodata: {
          [this.geoDataTypes.geoData1]: [],
          [this.geoDataTypes.geoData2]: []
        }
      };
      if (id) {
        this.store.dispatch(
          new MediaActions.SelectMediaItem({
            mediaItem
          })
        );
      }
    } else if (selectedNavType === 'ca') {
      const caItem: CaThumbnailItem = {
        ca_number: undefined,
        discipline: undefined,
        level_name: undefined,
        level_number: undefined,
        phase: undefined,
        return_date: undefined,
        status: undefined,
        time: undefined,
        title: undefined,
        type: undefined,
        url_endpoint: id,
        geodata: {
          [this.geoDataTypes.geoData1]: [],
          [this.geoDataTypes.geoData2]: []
        }
      };
      if (id) {
        this.store.dispatch(
          new CaActions.SelectCaItem({
            caItem
          })
        );
      }
    } else if (selectedNavType === 'specification') {
      const specificationItem: SpecificationThumbnailItem = {
        id: undefined,
        discipline: undefined,
        phase: undefined,
        url_endpoint: id,
        division: undefined,
        spec_number: undefined,
        spec_title: undefined,
        time: undefined,
        phase_group: undefined,
        type: undefined
      };
      if (id) {
        this.store.dispatch(
          new SpecificationActions.SelectSpecificationItem({
            specificationItem
          })
        );
      }
    }
    if (isNaN(Number(thirdParam))) {
      /**
      * define default type
      */
      const query = {};
      if (selectedNavType === 'media') {
        query['type'] = 'photo';
      } else if (selectedNavType === 'drawing') {
        query['type'] = 'progress';
      } else if (selectedNavType === 'ca') {
        query['type'] = 'rfi';
      }
      this.store.dispatch(new RouterActions.Go(
        { path: ['dashboard', selectedNavType, 1, thirdParam], query }
      ));
    } else if (selectedNavType === 'specification' && !route.queryParams.hasOwnProperty('division')) {
      const query = {
        division: ''
      };
      this.store.dispatch(new RouterActions.Go(
        { path: ['dashboard', selectedNavType, 1], query }
      ));
    }
    return of(true);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
