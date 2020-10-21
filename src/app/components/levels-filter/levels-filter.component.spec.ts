import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelsFilterComponent } from './levels-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

// animation module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LevelsFilterComponent', () => {
  let component: LevelsFilterComponent;
  let fixture: ComponentFixture<LevelsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      declarations: [ LevelsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
