import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';

import { MapContainerComponent } from './map-container.component';
import * as fromStore from '../../store';

xdescribe('MapContainerComponent', () => {
  let store: Store<fromStore.State>;

  let component: MapContainerComponent;
  let fixture: ComponentFixture<MapContainerComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [MapContainerComponent],
      imports: [
        StoreModule.forRoot({})
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapContainerComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
