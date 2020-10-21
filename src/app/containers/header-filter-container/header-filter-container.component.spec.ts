import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ConfigurationService } from 'src/app/core/configuration.service';
import { HttpClient } from '@angular/common/http';

// store
import * as fromStore from '../../store';

import { HeaderFilterContainerComponent } from './header-filter-container.component';

class MockConfigService extends ConfigurationService {
  getConfig() {
    return {
      apiRoot: '',
      geoDataTypes: {
        geoData1: '',
        geoData2: ''
      }
    };
  }
}

describe('HeaderFilterContainerComponent', () => {
  let component: HeaderFilterContainerComponent;
  let fixture: ComponentFixture<HeaderFilterContainerComponent>;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromStore.ROOT_REDUCERS
        })
      ],
      declarations: [ HeaderFilterContainerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
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
    fixture = TestBed.createComponent(HeaderFilterContainerComponent);
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
