import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { ConfigurationService } from 'src/app/core/configuration.service';

import { ItemHeaderContainerComponent } from './item-header-container.component';
// store
import * as fromStore from '../../store';

class MockConfigService extends ConfigurationService {
  getConfig() {
    return {
      apiRoot: ''
    };
  }
}

describe('ItemHeaderContainerComponent', () => {
  let component: ItemHeaderContainerComponent;
  let fixture: ComponentFixture<ItemHeaderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemHeaderContainerComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [
        StoreModule.forRoot({
          ...fromStore.ROOT_REDUCERS
        })
      ],
      providers: [
        {
          provide: ConfigurationService,
          useClass: MockConfigService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHeaderContainerComponent);
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
