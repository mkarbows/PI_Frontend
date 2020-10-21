import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffgridButtonComponent } from './offgrid-button.component';

xdescribe('OffgridButtonComponent', () => {
  let component: OffgridButtonComponent;
  let fixture: ComponentFixture<OffgridButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffgridButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffgridButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
