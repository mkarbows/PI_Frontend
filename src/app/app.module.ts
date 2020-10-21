// angular and ngrx modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

// modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { FileUploadModule } from 'ng2-file-upload';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxFileDropModule } from 'ngx-file-drop';

// services
import { NoCacheHeadersInterceptor } from './services/data.service';

// reducers
import { CustomSerializer, ROOT_REDUCERS, metaReducers } from './store';

// effects
import { effects } from './store/effects';

// containers
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';
import {
  DrawingItemFullsizeContainerComponent
} from './containers/drawing-item-fullsize-container/drawing-item-fullsize-container.component';
import { HeaderFilterContainerComponent } from './containers/header-filter-container/header-filter-container.component';
import { ItemContainerComponent } from './containers/item-container/item-container.component';
import { ItemHeaderContainerComponent } from './containers/item-header-container/item-header-container.component';
import { ItemFullsizeContainerComponent } from './containers/item-fullsize-container/item-fullsize-container.component';
import { ItemGridContainerComponent } from './containers/item-grid-container/item-grid-container.component';
import { ItemTableContainerComponent } from './containers/item-table-container/item-table-container.component';
import { MapContainerComponent } from './containers/map-container/map-container.component';
import { MediaItemFullsizeContainerComponent } from './containers/media-item-fullsize-container/media-item-fullsize-container.component';
import { RightPanelContainerComponent } from './containers/right-panel-container/right-panel-container.component';
import { CaItemFullsizeContainerComponent } from './containers/ca-item-fullsize-container/ca-item-fullsize-container.component';

// components
import { AppComponent } from './app.component';
import { CaItemComponent } from './components/ca-item/ca-item.component';
import { SegmentFilterComponent } from './components/segment-filter/segment-filter.component';
import { CaItemFullsizeComponent } from './components/ca-item-fullsize/ca-item-fullsize.component';
import { CaStatusComponent } from './components/ca-status/ca-status.component';
import { DrawingItemFullsizeComponent } from './components/drawing-item-fullsize/drawing-item-fullsize.component';
import { DrawingItemComponent } from './components/drawing-item/drawing-item.component';
import { DrawingSheetTypeComponent } from './components/drawing-sheet-type/drawing-sheet-type.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FullsizeHeaderComponent } from './components/fullsize-header/fullsize-header.component';
import { ItemNavComponent } from './components/item-nav/item-nav.component';
import { ItemTypeComponent } from './components/item-type/item-type.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LevelNavigatorComponent } from './components/level-navigator/level-navigator.component';
import { MapComponent } from './components/map/map.component';
import { MediaItemComponent } from './components/media-item/media-item.component';
import { MediaItemFullsizeComponent } from './components/media-item-fullsize/media-item-fullsize.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { OffgridButtonComponent } from './components/offgrid-button/offgrid-button.component';
import { PagingComponent } from './components/paging/paging.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { UploadDialogComponent } from './components/markup-upload-dialog/markup-upload-dialog.component';
import { MarkupDeleteDialogComponent } from './components/markup-delete-dialog/markup-delete-dialog.component';
import { ItemNoResultsComponent } from './components/item-no-results/item-no-results.component';
import { PhaseFilterComponent } from './components/phase-filter/phase-filter.component';
import { DisciplineFilterComponent } from './components/discipline-filter/discipline-filter.component';
import { TerminalFilterComponent } from './components/terminal-filter/terminal-filter.component';
import { ResetFiltersComponent } from './components/reset-filters/reset-filters.component';
import { LevelsFilterComponent } from './components/levels-filter/levels-filter.component';
import { ZoomToSelectionComponent } from './components/zoom-to-selection/zoom-to-selection.component';
import { PdfViewerComponent } from './shared/components/pdf-viewer/pdf-viewer.component';
import { StartDateFilterComponent } from './components/start-date-filter/start-date-filter.component';
import { EndDateFilterComponent } from './components/end-date-filter/end-date-filter.component';
import { SpecificationItemComponent } from './components/specification-item/specification-item.component';
import { SpecificationDivisionComponent} from './components/specification-division/specification-division.component';
import { MediaUploadDialogComponent } from './components/media-upload-dialog/media-upload-dialog.component';
import { SpecificationItemFullsizeContainerComponent } from './containers/specification-item-fullsize-container/specification-item-fullsize-container.component';
import { SpecificationItemFullsizeComponent } from './components/specification-item-fullsize/specification-item-fullsize.component';
import { ZoomToSelectionBtnComponent } from './components/zoom-to-selection-btn/zoom-to-selection-btn.component';

// environment
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CaItemFullsizeComponent,
    CaItemComponent,
    CaItemFullsizeComponent,
    CaStatusComponent,
    DashboardContainerComponent,
    DrawingItemFullsizeComponent,
    DrawingItemFullsizeContainerComponent,
    DrawingItemComponent,
    DrawingSheetTypeComponent,
    FullsizeHeaderComponent,
    HeaderComponent,
    HeaderFilterContainerComponent,
    ItemContainerComponent,
    ItemFullsizeContainerComponent,
    ItemGridContainerComponent,
    ItemHeaderContainerComponent,
    ItemNavComponent,
    ItemTableContainerComponent,
    ItemTypeComponent,
    LandingPageComponent,
    LevelNavigatorComponent,
    MapComponent,
    MapContainerComponent,
    MediaItemComponent,
    MediaItemFullsizeComponent,
    MediaItemFullsizeContainerComponent,
    ModalComponent,
    OffgridButtonComponent,
    PagingComponent,
    RightPanelContainerComponent,
    MarkupDeleteDialogComponent,
    SpinnerComponent,
    UploadDialogComponent,
    CaItemFullsizeContainerComponent,
    ItemNoResultsComponent,
    PhaseFilterComponent,
    DisciplineFilterComponent,
    TerminalFilterComponent,
    SegmentFilterComponent,
    ResetFiltersComponent,
    LevelsFilterComponent,
    ZoomToSelectionComponent,
    PdfViewerComponent,
    StartDateFilterComponent,
    EndDateFilterComponent,
    SpecificationItemComponent,
    SpecificationDivisionComponent,
    SpecificationItemFullsizeContainerComponent,
    SpecificationItemFullsizeComponent,
    SpecificationItemComponent,
    SpecificationDivisionComponent,
    MediaUploadDialogComponent,
    ZoomToSelectionBtnComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    OverlayModule,
    FlexLayoutModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
    NgxFileDropModule,
    // include meta reducers so we can log actions and state in dev
    StoreModule.forRoot(ROOT_REDUCERS, { metaReducers }),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
  ],
  entryComponents: [
    ModalComponent,
    PdfViewerComponent,
    OffgridButtonComponent,
    LevelNavigatorComponent,
    ZoomToSelectionBtnComponent,
    MarkupDeleteDialogComponent,
    UploadDialogComponent,
    MediaUploadDialogComponent
  ],
  providers: [
    OffgridButtonComponent,
    LevelNavigatorComponent,
    ZoomToSelectionBtnComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheHeadersInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
