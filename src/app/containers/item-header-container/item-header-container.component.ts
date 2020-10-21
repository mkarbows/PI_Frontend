/**
 * @author Arup
 * @description
 * Container component that acts as the header
 * for the item container.  Parent of filter
 * and paging components
 **/
import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Params } from '@angular/router';
import { GeoDataTypes, PiConfig } from 'src/app/core/app-config';
import { ConfigurationService } from 'src/app/core/configuration.service';

// actions
import { RightPanelActions, RouterActions } from '../../store/actions';

// models
import { Filter } from 'src/app/shared/models/filter.model';

// reducers
import * as fromStore from '../../store';

@Component({
  selector: 'app-item-header-container',
  templateUrl: './item-header-container.component.html',
  styleUrls: ['./item-header-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemHeaderContainerComponent implements OnDestroy {
  @Input() pageItemCount: number;
  @Input() selectedNavType: string;

  config: PiConfig;
  geoDataTypes: GeoDataTypes;

  itemTypeFilters$: Observable<Filter[]>;
  selectedSheetType$: Observable<string>;
  selectedCaStatus$: Observable<string>;
  sheetTypeFilters$: Observable<Filter[]>;
  caStatusFilters$: Observable<Filter[]>;
  specificationDivisionFilters$: Observable<Filter[]>;
  currentPage: number;
  currentPage$: Observable<number>;
  selectedNavType$: Observable<string>;
  selectedItemType$: Observable<string>;
  selectedItemType: string;
  selectedDivision$: Observable<string>;
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
    this.geoDataTypes = this.config.geoDataTypes;

    /** get options for item type select component */
    this.itemTypeFilters$ = this.store.pipe(
      select(fromStore.getCurrentitemTypeFilters)
    );

    /** get selected sheet type for drawing sheet type select component */
    this.selectedSheetType$ = this.store.pipe(
      select(fromStore.getSelectedSheetType)
    );

    /** get sheet types for drawing sheet type select component */
    this.sheetTypeFilters$ = this.store.pipe(
      select(fromStore.getDrawingSheetTypeFilters)
    );

    /** get selected status for ca-status select component */
    this.selectedCaStatus$ = this.store.pipe(
      select(fromStore.getSelectedCaStatus)
    );

    /** get statuses for ca-status select component */
    this.caStatusFilters$ = this.store.pipe(
      select(fromStore.getCaStatusFilters)
    );

    /** get selected division for specification division select component */
    this.selectedDivision$ = this.store.pipe(
      select(fromStore.getSelectedDivision)
    );

    /** get specification division filters */
    this.specificationDivisionFilters$ = this.store.pipe(
      select(fromStore.getSpecificationDivisionFilters)
    );

    /** subscribe to itemType observable for Router.go path*/
    // this.itemTypeSubscription = this.store
    //   .select(fromStore.getSelectedItemType)
    //   .subscribe(itemType => this.itemType = itemType);

    /** get current page for paging component */
    this.currentPage$ = this.store.pipe(
      select(fromStore.getCurrentPage),
      tap(page => this.currentPage = page)
    );
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
    });
  }


  /**
   * Item type change handler for the item type
   * select component to set the selected item
   * type
   *
   * @param itemType the selected item type
   */
  changeItemTypeAlert(itemType) {
    this.store.dispatch(new RouterActions.Go({
      path: ['dashboard', this.selectedNavType, 1],
      query: {type: itemType.selectedItemType}
    }));
  }

  /**
   * Change handler for the paging component for when
   * the user changes page
   *
   * @param currentPage the page number to change to
   */
  changePageAlert(currentPage: number) {
    this.store.dispatch(new RouterActions.Go({
      path: ['dashboard', this.selectedNavType, currentPage],
      query: {
        type: this.selectedItemType,
        [this.geoDataTypes.geoData1]: this.routeQueryParams[this.geoDataTypes.geoData1],
        phase: this.routeQueryParams.phase,
        discipline: this.routeQueryParams.discipline,
        level: this.routeQueryParams.level,
        [this.geoDataTypes.geoData2]: this.routeQueryParams[this.geoDataTypes.geoData2],
        start_date: this.routeQueryParams.start_date,
        end_date: this.routeQueryParams.end_date
      }
    }));
  }

  /**
   * Change handler for the drawing sheet type component
   * to set the selected sheet type
   *
   * @param sheetType selected sheet type
   */
  changeSheetTypeAlert(sheetType) {
    this.store.dispatch(
      new RightPanelActions.ChangeSheetType({
        selectedSheetType: sheetType.selectedSheetType
      })
    );
    if (sheetType.selectedSheetType !== '') {
      this.store.dispatch(new RouterActions.Go({
        path: ['dashboard', this.selectedNavType, 1],
        query: { sheettype: sheetType.selectedSheetType }
      }));
    } else {
      this.store.dispatch(new RouterActions.Reset({
        path: ['dashboard', this.selectedNavType, 1],
        query: {
          type: this.selectedItemType,
          [this.geoDataTypes.geoData1]: this.routeQueryParams[this.geoDataTypes.geoData1],
          phase: this.routeQueryParams.phase,
          discipline: this.routeQueryParams.discipline,
          level: this.routeQueryParams.level,
          [this.geoDataTypes.geoData2]: this.routeQueryParams[this.geoDataTypes.geoData2],
          start_date: this.routeQueryParams.start_date,
          end_date: this.routeQueryParams.end_date
          }
      }));
    }
  }

  /**
   * Change handler for the ca status component
   * to set the selected status
   *
   * @param caStatus selected status
   */
  changeCaStatusAlert(caStatus) {
    this.store.dispatch(
      new RightPanelActions.ChangeCaStatus({
        selectedCaStatus: caStatus.selectedCaStatus
      })
    );
    if (caStatus.selectedCaStatus !== '') {
      this.store.dispatch(new RouterActions.Go({
        path: ['dashboard', this.selectedNavType, 1],
        query: { status: caStatus.selectedCaStatus }
      }));
    } else {
      this.store.dispatch(new RouterActions.Reset({
        path: ['dashboard', this.selectedNavType, 1],
        query: {
          type: this.selectedItemType,
          [this.geoDataTypes.geoData1]: this.routeQueryParams[this.geoDataTypes.geoData1],
          phase: this.routeQueryParams.phase,
          discipline: this.routeQueryParams.discipline,
          level: this.routeQueryParams.level,
          [this.geoDataTypes.geoData2]: this.routeQueryParams[this.geoDataTypes.geoData2],
          start_date: this.routeQueryParams.start_date,
          end_date: this.routeQueryParams.end_date
          }
      }));
    }
  }

  /**
   * change hander for the specification division component
   * to set the selected division
   *
   * @param division selected division
   */
  changeDivisionAlert(division) {
    this.store.dispatch(
      new RightPanelActions.ChangeDivision({
        selectedDivision: division.selectedDivision
      })
    );
    if (division.selectedDivision !== '') {
      this.store.dispatch(new RouterActions.Go({
        path: ['dashboard', this.selectedNavType, 1],
        query: { division: division.selectedDivision }
      }));
    } else {
      this.store.dispatch(new RouterActions.Reset({
        path: ['dashboard', this.selectedNavType, 1],
      }));
    }
  }

  ngOnDestroy() {
    this.routeQueryParamsSubscription.unsubscribe();
  }

}
