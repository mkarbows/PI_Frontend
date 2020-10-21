import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ConfigurationService } from 'src/app/core/configuration.service';
import { HeaderComponent } from './header.component';
import { PiConfig } from 'src/app/core/app-config';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockConfigService: any;

  beforeEach(() => {
    mockConfigService = jasmine.createSpyObj(['getConfig']);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ConfigurationService, useValue: mockConfigService }
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  xit('should create', () => {
    mockConfigService.getConfig.and.returnValue({
      projectName: 'A project name',
      externalLink: {
        name: 'Delta Live Camera',
        path: '',
        disabled: false
      },
      feedbackLink: {
        path: '',
        disabled: false
      }
    });
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  xit('should assign a value to projectName', () => {
    mockConfigService.getConfig.and.returnValue({
      projectName: 'My Dashboard',
      externalLink: {
        name: 'Delta Live Camera',
        path: '',
        disabled: false
      },
      feedbackLink: {
        path: '',
        disabled: false
      }
    });
    fixture.detectChanges();

    expect(fixture.componentInstance.projectName).toBe('My Dashboard');
  });
});
