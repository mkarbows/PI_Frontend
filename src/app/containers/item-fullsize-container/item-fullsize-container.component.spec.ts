import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { StoreModule } from '@ngrx/store';

// store
import * as fromStore from '../../store';

import { ItemFullsizeContainerComponent } from './item-fullsize-container.component';

describe('ItemFullsizeContainerComponent', () => {
  let component: ItemFullsizeContainerComponent;
  let fixture: ComponentFixture<ItemFullsizeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromStore.ROOT_REDUCERS
        }),
      ],
      declarations: [ ItemFullsizeContainerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemFullsizeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
