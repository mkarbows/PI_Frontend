import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatInputModule, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MediaItemFullsizeComponent } from './media-item-fullsize.component';
import { MediaItem } from 'src/app/shared/models/item.model';

describe('MediaItemFullsizeComponent', () => {
  let component: MediaItemFullsizeComponent;
  let fixture: ComponentFixture<MediaItemFullsizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatInputModule, MatSnackBarModule],
      declarations: [MediaItemFullsizeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    /** mock media item */
    const mediaItem: MediaItem = {
      title: 'Fake news',
      type: 'Video',
      url_endpoint: 'f1a2c3e4b5o6o7k',
      geodata: {
        segment: [],
        terminal: []
      },
      taken_by: null,
      time: null,
      lat: null,
      lon: null,
      id: null,
      altitude: null,
      bearing_simple: null,
      dhash: null,
      level_name: null,
      level_number: null,
      discipline: [],
      folder: [],
      file_name: [],
      file_path: [],
      download: null,
      stream: null
    };
    fixture = TestBed.createComponent(MediaItemFullsizeComponent);
    component = fixture.componentInstance;
    component.mediaItem = mediaItem;
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
