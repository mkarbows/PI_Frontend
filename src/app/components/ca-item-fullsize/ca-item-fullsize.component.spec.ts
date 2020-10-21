import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigurationService } from 'src/app/core/configuration.service';
import { HttpClient } from '@angular/common/http';

import { CaItemFullsizeComponent } from './ca-item-fullsize.component';

class MockConfigService extends ConfigurationService {
  getConfig() {
    return {
      apiRoot: ''
    };
  }
}

describe('CaItemFullsizeComponent', () => {
  let component: CaItemFullsizeComponent;
  let fixture: ComponentFixture<CaItemFullsizeComponent>;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, MatInputModule, MatTableModule ],
      declarations: [ CaItemFullsizeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {provide: MatSnackBar, useValue: {}},
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
    /** mock ca item */
    const selectedCaItem = {
      discipline: [],
      level_name: [],
      level_number: [],
      geodata: {
        segment: [],
        terminal: []
      },
      phase: '',
      time: new Date(),
      type: '',
      ca_number: '',
      title: '',
      return_date: new Date(),
      responsible_firm: '',
      cafiles: [],
      url_endpoint: '',
      associated_drawings: [],
      pmtk_url: '',
      status: '',
      create_date: new Date(),
      update_date: new Date(),
      issue_date: new Date(),
      receive_date: new Date(),
      due_date: new Date(),
      administrator: '',
      return_company: '',
      grid: '',
      description: '',
      division: '',
      specifications: [],
    };
    fixture = TestBed.createComponent(CaItemFullsizeComponent);
    component = fixture.componentInstance;
    component.caItem = selectedCaItem;
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
