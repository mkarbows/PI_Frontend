import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaUploadDialogComponent } from './media-upload-dialog.component';
import { MatDialogRef, MatDialogModule, MatInputModule, MAT_DIALOG_DATA, MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ConfigurationService } from '../../core/configuration.service';

import * as fromStore from '../../store';

class MockConfigService extends ConfigurationService {
  getConfig() {
    return {
      apiRoot: ''
    };
  }
}

xdescribe('MediaUploadDialogComponent', () => {
  let component: MediaUploadDialogComponent;
  let fixture: ComponentFixture<MediaUploadDialogComponent>;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatInputModule, MatTableModule,
        StoreModule.forRoot({
          ...fromStore.ROOT_REDUCERS
        }),
      ],
      declarations: [ MediaUploadDialogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: HttpClient, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
          provide: ConfigurationService,
          useClass: MockConfigService
        },
      ]
    })
    .compileComponents();

    httpClient = TestBed.get(HttpClient);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaUploadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
