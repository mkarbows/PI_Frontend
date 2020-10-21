import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetFiltersComponent } from './reset-filters.component';

describe('ResetFiltersComponent', () => {
  let component: ResetFiltersComponent;
  let fixture: ComponentFixture<ResetFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
