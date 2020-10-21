import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { ConfigurationService } from 'src/app/core/configuration.service';
import { HttpClient } from '@angular/common/http';

import { CaItemComponent } from './ca-item.component';

class MockConfigService extends ConfigurationService {
  getConfig() {
    return {
      apiRoot: ''
    };
  }
}

describe('CaItemComponent', () => {
  let component: CaItemComponent;
  let fixture: ComponentFixture<CaItemComponent>;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatTableModule ],
      declarations: [ CaItemComponent ],
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
    fixture = TestBed.createComponent(CaItemComponent);
    component = fixture.componentInstance;
    component.geoDataTypes = {
      geoData1: '',
      geoData2: ''
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
