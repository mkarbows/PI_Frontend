import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkupDeleteDialogComponent } from './markup-delete-dialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BasePortalHost } from '@angular/cdk/portal';

const testItem = {
    markups: [
        {
            comments: 'Blah',
            title: 'blah blah',
            username: 'Andrew.Nguyen',
            time: '12-13-19',
            url_endpoint: 'jwpoigpewghpoiwhgwoiwahgpwahpoigehag'

        }
    ]
};

describe('MarkupDeleteDialogComponent', () => {
  let component: MarkupDeleteDialogComponent;
  let fixture: ComponentFixture<MarkupDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkupDeleteDialogComponent ],
      providers: [
          { provide: MatDialogRef, useValue: {} },
          { provide: MAT_DIALOG_DATA, useValue: {item: testItem, index: 0 } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkupDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
