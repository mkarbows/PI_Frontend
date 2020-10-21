import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNoResultsComponent } from './item-no-results.component';

xdescribe('ItemNoResultsComponent', () => {
  let component: ItemNoResultsComponent;
  let fixture: ComponentFixture<ItemNoResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemNoResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemNoResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
