import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule, MatTableModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigurationService } from 'src/app/core/configuration.service';

import { DrawingItemFullsizeComponent } from './drawing-item-fullsize.component';

class MockConfigService extends ConfigurationService {
  getConfig() {
    return {
      apiRoot: ''
    };
  }
}

describe('DrawingItemFullsizeComponent', () => {
  let component: DrawingItemFullsizeComponent;
  let fixture: ComponentFixture<DrawingItemFullsizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatInputModule, MatTableModule,
        MatDialogModule,
      ],
      declarations: [ DrawingItemFullsizeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MatSnackBar,
          useValue: {}
        },
        {
          provide: ConfigurationService,
          useClass: MockConfigService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    /** mock drawing item */
    const selectedDrawingItem = {
      id: undefined,
      file_name: '',
      level_name: '',
      sheet_type: null,
      sheet_type_id: null,
      drawing_number: 'MTD-M6.102',
      title: 'T2_T3 - MECHANICAL DETAILS',
      level_number: null,
      phase: null,
      discipline: ['Mechanical'],
      time: new Date(),
      url_endpoint: 'progress_mtd-m6-102',
      type: 'progress',
      markups: [],
      sheet_number: '',
      plan_type: '',
      geodata: {
        segment: [],
        terminal: [],
      },
      folder: '',
      file_path: '',
      path: '',
      associated_caitems: [],
      download: null,
      stream: null
    };
    fixture = TestBed.createComponent(DrawingItemFullsizeComponent);
    component = fixture.componentInstance;
    component.drawingItem = selectedDrawingItem;
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
