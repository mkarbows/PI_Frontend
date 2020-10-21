import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { ConfigurationService } from '../../core/configuration.service';
import { HttpClient } from '@angular/common/http';

// store
import * as fromStore from '../../store';

import { SpecificationItemFullsizeContainerComponent } from './specification-item-fullsize-container.component';

class MockConfigService extends ConfigurationService {
  getConfig() {
    return {
      apiRoot: ''
    };
  }
}

xdescribe('DrawingItemFullsizeContainerComponent', () => {
  let component: SpecificationItemFullsizeContainerComponent;
  let fixture: ComponentFixture<SpecificationItemFullsizeContainerComponent>;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationItemFullsizeContainerComponent ],
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
    fixture = TestBed.createComponent(SpecificationItemFullsizeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
