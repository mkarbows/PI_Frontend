import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigurationService } from 'src/app/core/configuration.service';
import { HttpClient } from '@angular/common/http';

import { ItemGridContainerComponent } from './item-grid-container.component';
// store
import * as fromStore from '../../store';

class MockConfigService extends ConfigurationService {
  getConfig() {
    return {
      apiRoot: ''
    };
  }
}

describe('ItemGridContainerComponent', () => {
  let component: ItemGridContainerComponent;
  let fixture: ComponentFixture<ItemGridContainerComponent>;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGridContainerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        StoreModule.forRoot({
          ...fromStore.ROOT_REDUCERS
        })
      ],
      providers: [
        {
          provide: MatSnackBar,
          useValue: {}
        },
        {
          provide: ConfigurationService,
          useClass: MockConfigService
        },
        { provide: HttpClient, useValue: {} }
      ]
    })
    .compileComponents();

    httpClient = TestBed.get(HttpClient);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGridContainerComponent);
    component = fixture.componentInstance;
    component.geoDataTypes = {
      geoData1: '',
      geoData2: ''
    };
    fixture.detectChanges();
  });

  afterEach(() => {
    spyOn(component, 'ngOnDestroy').and.callFake(() => { });
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
