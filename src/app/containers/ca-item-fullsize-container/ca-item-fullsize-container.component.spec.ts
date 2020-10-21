import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

// store
import * as fromStore from '../../store';

import { CaItemFullsizeContainerComponent } from './ca-item-fullsize-container.component';

xdescribe('CaItemFullsizeContainerComponent', () => {
  let component: CaItemFullsizeContainerComponent;
  let fixture: ComponentFixture<CaItemFullsizeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromStore.ROOT_REDUCERS
        }),
        MatDialogModule
      ],
      declarations: [CaItemFullsizeContainerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaItemFullsizeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    spyOn(component, 'ngOnDestroy').and.callFake(() => { });
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
