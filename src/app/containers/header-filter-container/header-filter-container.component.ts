import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Params } from '@angular/router';

import { GeoDataTypes, PiConfig } from 'src/app/core/app-config';
import { ConfigurationService } from 'src/app/core/configuration.service';

import * as fromStore from '../../store';

import { HeaderFilterActions, RouterActions } from '../../store/actions';

@Component({
  selector: 'app-header-filter-container',
  templateUrl: './header-filter-container.component.html',
  styleUrls: ['./header-filter-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderFilterContainerComponent implements OnDestroy {
  config: PiConfig;
  geoDataTypes: GeoDataTypes;

  terminalFilters$: Observable<any>;
  selectedTerminal$: Observable<any>;
  selectedTerminal: string;

  phaseFilters$: Observable<any>;
  selectedPhase$: Observable<any>;
  selectedPhase: string;

  disciplineFilters$: Observable<any>;
  selectedDiscipline$: Observable<any>;
  selectedDiscipline: string;

  levels$: Observable<any>;
  selectedLevel$: Observable<any>;
  selectedLevel: string;

  segmentFilters$: Observable<any>;
  filteredSegment$: Observable<any>;
  filteredSegment: string;

  selectedStartDate$: Observable<string>;
  selectedStartDate: string;

  selectedEndDate$: Observable<string>;
  selectedEndDate: string;

  selectedNavType$: Observable<string>;
  selectedNavType: string;

  selectedItemType$: Observable<string>;
  selectedItemType: string;

  selectedDivision$: Observable<string>;
  selectedDivision: string;

  currentPage: number;

  /** route parameters */
  routeParamsSubscription: Subscription;
  routeQueryParamsSubscription: Subscription;
  routeQueryParams: Params;

  constructor(
    private store: Store<fromStore.State>,
    private configService: ConfigurationService
  ) {
    this.config = this.configService.getConfig();
    this.geoDataTypes = this.config.geoDataTypes;
    /**
     * get terminal filters and selected terminal observable
     */
    this.terminalFilters$ = this.store.pipe(
      select(fromStore.getTerminalFilters)
    );
    this.selectedTerminal$ = this.store.pipe(
      select(fromStore.getSelectedTerminal, {geoData1: this.geoDataTypes.geoData1}),
      tap(selectedTerminal => this.selectedTerminal = selectedTerminal)
    );

    /**
     * get phase filters and selected phase observable
     */
    this.phaseFilters$ = this.store.pipe(
      select(fromStore.getPhaseFilters)
    );
    this.selectedPhase$ = this.store.pipe(
      select(fromStore.getSelectedPhase),
      tap(selectedPhase => this.selectedPhase = selectedPhase)
    );

    /**
     * get discipline filters and selected discipline observable
     */
    this.disciplineFilters$ = this.store.pipe(
      select(fromStore.getDisciplineFilters)
    );
    this.selectedDiscipline$ = this.store.pipe(
      select(fromStore.getSelectedDiscipline),
      tap(selectedDiscipline => this.selectedDiscipline = selectedDiscipline)
    );

    /**
     * get level filters and selected level observable
     */
    this.levels$ = this.store.pipe(
      select(fromStore.getLevels)
    );
    this.selectedLevel$ = this.store.pipe(
      select(fromStore.getSelectedLevel),
      tap(selectedLevel => this.selectedLevel = selectedLevel)
    );

    /**
     * get segment filters and selected segment observable
     */
    this.segmentFilters$ = this.store.pipe(
      select(fromStore.getSegmentFilters)
    );
    this.filteredSegment$ = this.store.pipe(
      select(fromStore.getFilteredSegment, {geoData2: this.geoDataTypes.geoData2}),
      tap(filteredSegment => this.filteredSegment = filteredSegment)
    );

    /** get selected start date observable */
    this.selectedStartDate$ = this.store.pipe(
      select(fromStore.getSelectedStartDate),
      tap(selectedStartDate => this.selectedStartDate = selectedStartDate)
    );

    /** get selected end date observable */
    this.selectedEndDate$ = this.store.pipe(
      select(fromStore.getSelectedEndDate),
      tap(selectedEndDate => this.selectedEndDate = selectedEndDate)
    );

    /** get route params */
    this.routeParamsSubscription = store
      .select(fromStore.getRouteParams)
      .subscribe((params: Params) => {
        this.selectedNavType = params.selectedNavType;
        this.currentPage = params.currentPage;
    });
    /** get route query params */
    this.routeQueryParamsSubscription = store
      .select(fromStore.getRouteQueryParams)
      .subscribe((params: Params) => {
        this.selectedItemType = params.type;
        this.selectedDivision = params.division;
        this.routeQueryParams = params;
      });

  }

  zoomToSelectionAlert(setting: boolean) {
    this.store.dispatch(new HeaderFilterActions.ZoomToSelection({zoomToSelection: setting}));
  }

  resetFiltersAlert() {
    this.store.dispatch(new HeaderFilterActions.HeaderFilterMapInitialState({init: true}));
    if (this.selectedNavType === 'specification') {
      this.store.dispatch(new RouterActions.Reset(
        { path: ['dashboard', this.selectedNavType, 1], query: {division: this.selectedDivision} }
      ));
    } else {
      this.store.dispatch(new RouterActions.Reset(
        { path: ['dashboard', this.selectedNavType, 1], query: {type: this.selectedItemType} }
      ));
    }
  }

  changeTerminalSelectionAlert(terminal) {
    if (terminal.selectedTerminal !== '') {
      this.store.dispatch(new RouterActions.Go({
        path: ['dashboard', this.selectedNavType, 1],
        query: {[this.geoDataTypes.geoData1]: terminal.selectedTerminal}
      }));
    } else {
      this.store.dispatch(new RouterActions.Reset({
        path: ['dashboard', this.selectedNavType, 1],
        query: {
          ...this.routeQueryParams,
          type: this.selectedItemType,
          [this.geoDataTypes.geoData1]: null
        }
      }));
    }
  }

  changePhaseSelectionAlert(phase) {
    if (phase.selectedPhase !== '') {
      this.store.dispatch(new RouterActions.Go({
        path: ['dashboard', this.selectedNavType, 1],
        query: {phase: phase.selectedPhase}
      }));
    } else {
      this.store.dispatch(new RouterActions.Reset({
        path: ['dashboard', this.selectedNavType, 1],
        query: {
          ...this.routeQueryParams,
          type: this.selectedItemType,
          phase: null
        }
      }));
    }
  }

  changeDiscplineSelectionAlert(discipline) {
    if (discipline.selectedDiscipline !== '') {
      this.store.dispatch(new RouterActions.Go({
        path: ['dashboard', this.selectedNavType, 1],
        query: {discipline: discipline.selectedDiscipline}
      }));
    } else {
      this.store.dispatch(new RouterActions.Reset({
        path: ['dashboard', this.selectedNavType, 1],
        query: {
          ...this.routeQueryParams,
          type: this.selectedItemType,
          discipline: null
        }
      }));
    }
  }

  changeLevelSelectionAlert(level) {
    if (level.selectedLevel !== '') {
      this.store.dispatch(new RouterActions.Go({
        path: ['dashboard', this.selectedNavType, 1],
        query: {level: level.selectedLevel}
      }));
    } else {
      this.store.dispatch(new RouterActions.Reset({
        path: ['dashboard', this.selectedNavType, 1],
        query: {
          ...this.routeQueryParams,
          type: this.selectedItemType,
          level: null
        }
      }));
    }
  }

  changeSegmentSelectionAlert(segment) {
    if (segment.filteredSegment !== '') {
      this.store.dispatch(new RouterActions.Go({
        path: ['dashboard', this.selectedNavType, 1],
        query: {[this.geoDataTypes.geoData2]: segment.filteredSegment}
      }));
    } else {
      this.store.dispatch(new RouterActions.Reset({
        path: ['dashboard', this.selectedNavType, 1],
        query: {
          ...this.routeQueryParams,
          type: this.selectedItemType,
          [this.geoDataTypes.geoData2]: null
        }
      }));
    }
  }

  changeStartDateSelectionAlert(startDate) {
    if (startDate.selectedStartDate !== '') {
      this.store.dispatch(new RouterActions.Go({
        path: ['dashboard', this.selectedNavType, 1],
        query: {start_date: startDate.selectedStartDate}
      }));
    } else {
      this.store.dispatch(new RouterActions.Reset({
        path: ['dashboard', this.selectedNavType, 1],
        query: {
          ...this.routeQueryParams,
          type: this.selectedItemType,
          start_date: null
        }
      }));
    }
  }

  changeEndDateSelectionAlert(endDate) {
    if (endDate.selectedEndDate !== '') {
      this.store.dispatch(new RouterActions.Go({
        path: ['dashboard', this.selectedNavType, 1],
        query: {end_date: endDate.selectedEndDate}
      }));
    } else {
      this.store.dispatch(new RouterActions.Reset({
        path: ['dashboard', this.selectedNavType, 1],
        query: {
          ...this.routeQueryParams,
          type: this.selectedItemType,
          end_date: null
        }
      }));
    }
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.routeQueryParamsSubscription.unsubscribe();
  }

}
