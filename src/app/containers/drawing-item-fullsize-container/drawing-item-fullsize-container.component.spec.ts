import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { ConfigurationService } from '../../core/configuration.service';
import { HttpClient } from '@angular/common/http';

// store
import * as fromStore from '../../store';

import { DrawingItemFullsizeContainerComponent } from './drawing-item-fullsize-container.component';

class MockConfigService extends ConfigurationService {
  getConfig() {
    return {
      apiRoot: ''
    };
  }
}

describe('DrawingItemFullsizeContainerComponent', () => {
  let component: DrawingItemFullsizeContainerComponent;
  let fixture: ComponentFixture<DrawingItemFullsizeContainerComponent>;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingItemFullsizeContainerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [
        StoreModule.forRoot({
          ...fromStore.ROOT_REDUCERS
        }),
        MatDialogModule
      ],
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
    fixture = TestBed.createComponent(DrawingItemFullsizeContainerComponent);
    component = fixture.componentInstance;
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
