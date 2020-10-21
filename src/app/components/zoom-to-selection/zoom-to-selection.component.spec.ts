import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomToSelectionComponent } from './zoom-to-selection.component';
import { MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

describe('ZoomToSelectionComponent', () => {
  let component: ZoomToSelectionComponent;
  let fixture: ComponentFixture<ZoomToSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule,
        FormsModule
      ],
      declarations: [ ZoomToSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomToSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
