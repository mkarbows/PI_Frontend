import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomToSelectionBtnComponent } from './zoom-to-selection-btn.component';

describe('ZoomToSelectionBtnComponent', () => {
  let component: ZoomToSelectionBtnComponent;
  let fixture: ComponentFixture<ZoomToSelectionBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomToSelectionBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomToSelectionBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
