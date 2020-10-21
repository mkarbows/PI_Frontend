import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';

// store
import * as fromStore from '../../store';

import { LandingPageComponent } from './landing-page.component';
import { ConfigurationService } from 'src/app/core/configuration.service';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let mockConfigService: any;

  beforeEach(() => {
    mockConfigService = jasmine.createSpyObj(['getConfig']);

    TestBed.configureTestingModule({
      declarations: [LandingPageComponent],
      imports: [
        StoreModule.forRoot({
          ...fromStore.ROOT_REDUCERS
        })
      ],
      providers: [
        { provide: ConfigurationService, useValue: mockConfigService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockConfigService.getConfig.and.returnValue({
      projectName: 'A project name'
    });
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should assign a value to projectName', () => {
    mockConfigService.getConfig.and.returnValue({
      projectName: 'My Dashboard'
    });
    fixture.detectChanges();

    expect(fixture.componentInstance.projectName).toBe('My Dashboard');
  });
});
