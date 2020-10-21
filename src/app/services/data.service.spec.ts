import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { DataService } from './data.service';
import { ConfigurationService } from '../core/configuration.service';

describe('DataService', () => {
  let httpClient: HttpClient;
  let mockConfigService: any;

  beforeEach(() => {
    mockConfigService = jasmine.createSpyObj(['getConfig']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ConfigurationService, useValue: mockConfigService },
        DataService,
        { provide: HttpClient, useValue: {} }
      ]
    });

    httpClient = TestBed.get(HttpClient);
  });

  xit('should be created', inject([DataService], (service: DataService) => {
    service.config = {
      dashboard: 'Pi',
      production: false,
      apiRoot: 'api',
      projectName: 'My Dashboard',
      landingPageIMG: '../components/landing-page/background-img.png',
      mapConfig: {
        zoom: 16,
        center: [-118.405543, 33.946182],
        basemap: 'gray-vector'
      },
      externalLink: {
        name: 'Delta Live Camera',
        path: '',
        disabled: false
      },
      feedbackLink: {
        path: '',
        disabled: false
      },
      navTypes: [
        {
          label: 'Media',
          path: 'media',
          defaultItemType: 'photo'
        },
        {
          label: 'Drawings',
          path: 'drawing',
          defaultItemType: 'progress'
        },
        {
          label: 'Specifications',
          path: 'specification',
          defaultItemType: '00'
        },
        {
          label: 'CA',
          path: 'ca',
          defaultItemType: 'rfi'
        }
      ],
      geoDataTypes: {
        geoData1: 'Terminal',
        geoData2: 'Segment'
      },
      auth: {
        clientID: '',
        domain: '',
        redirect: '',
        responseType: 'token',
        audience: '',
        scope: 'openid profile email',
        logoutURL: ''
      },
      gaCode: ''
    };
    expect(service).toBeTruthy();
  }));
});
