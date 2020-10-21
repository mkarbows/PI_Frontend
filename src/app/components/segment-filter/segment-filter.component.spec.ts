import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentFilterComponent } from './segment-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

// animation module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SegmentFilterComponent', () => {
  let component: SegmentFilterComponent;
  let fixture: ComponentFixture<SegmentFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [ SegmentFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentFilterComponent);
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
