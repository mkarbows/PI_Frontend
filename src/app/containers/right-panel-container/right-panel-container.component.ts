import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Params } from '@angular/router';

import * as fromStore from '../../store';

import { RouterActions } from '../../store/actions';
import { PiConfig, NavTypes, GeoDataTypes } from 'src/app/core/app-config';
import { ConfigurationService } from 'src/app/core/configuration.service';

@Component({
  selector: 'app-right-panel-container',
  templateUrl: './right-panel-container.component.html',
  styleUrls: ['./right-panel-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightPanelContainerComponent implements OnDestroy {
  /** navTypes from config file */
  config: PiConfig;
  navTypes: NavTypes[];
  geoDataTypes: GeoDataTypes;

  currentPage$: Observable<number>;
  selectedNavType$: Observable<string>;
  selectedItemType$: Observable<string>;
  selectedItemType: string;
  selectedTerminal: string;
  selectedPhase: string;
  selectedDiscipline: string;
  selectedLevel: string;
  filteredSegment: string;
  selectedStartDate: string;
  selectedEndDate: string;

  routeQueryParams: Params;
  routeQueryParamsSubscription: Subscription;

  constructor(
    private store: Store<fromStore.State>,
    private configService: ConfigurationService
  ) {
    this.config = this.configService.getConfig();
    this.navTypes = this.config.navTypes;
    this.geoDataTypes = this.config.geoDataTypes;

    this.currentPage$ = this.store.pipe(select(fromStore.getCurrentPage));
    this.selectedNavType$ = this.store.pipe(
      select(fromStore.getSelectedNavType)
    );
    this.selectedItemType$ = this.store.pipe(
      select(fromStore.getSelectedItemType)
    );

    /** get route query params */
    this.routeQueryParamsSubscription = store
      .select(fromStore.getRouteQueryParams)
      .subscribe((params: Params) => {
        this.routeQueryParams = params;
        this.selectedItemType = params.type;
        this.selectedTerminal = params[this.geoDataTypes.geoData1];
        this.selectedPhase = params.phase;
        this.selectedDiscipline = params.discipline;
        this.selectedLevel = params.level;
        this.filteredSegment = params[this.geoDataTypes.geoData2];
        this.selectedStartDate = params.start_date;
        this.selectedEndDate = params.end_date;
      }
    );
  }

  changeNavTypeAlert(navType) {
    /**
     * set the default selected item type
     * for when we change to a new tab
     */
    let itemType;
    this.navTypes.forEach(function (nav) {
      if (nav.path === navType.selectedNavType) {
        return itemType = nav.defaultItemType;
      }
    });
    this.selectedItemType = itemType;

    let query = {};
    if (navType.selectedNavType === 'specification') {
      query = {
        // pass empty string into the query because division to default to select all
        division: this.selectedItemType
      };
    } else {
      query = {
        type: this.selectedItemType
      };
    }
    query = {
      ...query,
      [this.geoDataTypes.geoData1]: this.routeQueryParams[this.geoDataTypes.geoData1],
      phase: this.routeQueryParams.phase,
      discipline: this.routeQueryParams.discipline,
      level: this.routeQueryParams.level,
      [this.geoDataTypes.geoData2]: this.routeQueryParams[this.geoDataTypes.geoData2],
      start_date: this.routeQueryParams.start_date,
      end_date: this.routeQueryParams.end_date
    };

    this.store.dispatch(
      new RouterActions.Reset({
        path: ['dashboard', navType.selectedNavType, 1],
        query
      })
    );
  }

  ngOnDestroy() {
    this.routeQueryParamsSubscription.unsubscribe();
  }
}
