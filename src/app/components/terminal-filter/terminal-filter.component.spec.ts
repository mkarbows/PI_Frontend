import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TerminalFilterComponent } from './terminal-filter.component';

describe('TerminalFilterComponent', () => {
  let component: TerminalFilterComponent;
  let fixture: ComponentFixture<TerminalFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalFilterComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalFilterComponent);
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
