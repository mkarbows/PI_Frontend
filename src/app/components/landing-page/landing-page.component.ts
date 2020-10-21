import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// actions
import { RouterActions } from '../../store/actions';

// config
import { PiConfig, NavTypes } from 'src/app/core/app-config';

// reducers
import * as fromStore from '../../store';

// services
import { ConfigurationService } from 'src/app/core/configuration.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  config: PiConfig;
  dashboard: string;
  projectName = '';
  navTypes: NavTypes[];

  constructor(
    private configService: ConfigurationService,
    private store: Store<fromStore.State>
  ) {}

  ngOnInit() {
    this.config = this.configService.getConfig();
    this.dashboard = this.config.dashboard;
    this.projectName = this.config.projectName;
    this.navTypes = this.config.navTypes;
  }

  enterPortal() {
    const defaultTab = this.navTypes[0].path;
    const defaultItemType = this.navTypes[0].defaultItemType;
    this.store.dispatch(
      new RouterActions.Go({
        path: ['dashboard', defaultTab, '1'],
        query: { type: defaultItemType }
      })
    );
  }
}
