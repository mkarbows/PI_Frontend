import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaItemComponent } from './media-item.component';
import { MediaThumbnailItem } from 'src/app/shared/models/item.model';

xdescribe('MediaItemComponent', () => {
  let component: MediaItemComponent;
  let fixture: ComponentFixture<MediaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaItemComponent);
    component = fixture.componentInstance;
    /** create mock input item */
    const thumbnail: MediaThumbnailItem = {
      title: 'My photo',
      type: 'Photo',
      url_endpoint: '123abc456def',
      geodata: {
        segment: ['E7'],
        terminal: []
      }
    };
    component.thumbnail = thumbnail;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
