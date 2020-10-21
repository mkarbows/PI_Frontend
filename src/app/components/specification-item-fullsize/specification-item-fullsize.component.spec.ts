import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificationItemFullsizeComponent } from './specification-item-fullsize.component';

xdescribe('SpecificationItemFullsizeComponent', () => {
  let component: SpecificationItemFullsizeComponent;
  let fixture: ComponentFixture<SpecificationItemFullsizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificationItemFullsizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificationItemFullsizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
