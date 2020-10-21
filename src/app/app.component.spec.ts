import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Store, StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
// actions
import { ToolbarActions } from './store/actions';
// store
import * as fromStore from './store';

import { ConfigurationService } from './core/configuration.service';

declare const window: any;

class MockConfigService extends ConfigurationService {
  getConfig() {
    return {
      apiRoot: ''
    };
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<fromStore.State>;
  // google analytics
  window.ga = function() {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromStore.ROOT_REDUCERS
        })
      ],
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ConfigurationService,
          useClass: MockConfigService
        }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    // google analytics
    spyOn(window, 'ga');
  }));

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should dispatch the dark mode change action', () => {
    const darkMode = true;
    const action = new ToolbarActions.DarkModeChange({ darkMode });
    component.changeTheme({ darkMode: true, theme: 'deltalax-light-theme' });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
