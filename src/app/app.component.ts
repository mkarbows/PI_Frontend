import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';

// config
import { PiConfig, ExternalLink, FeedbackLink } from 'src/app/core/app-config';
// for setting page title
import { filter, map} from 'rxjs/operators';
// actions
import { ToolbarActions } from './store/actions';
// state
import * as fromStore from './store';
// services
import { ConfigurationService } from './core/configuration.service';
// google analytics
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  config: PiConfig;
  externalLink: ExternalLink;
  feedbackLink: FeedbackLink;
  projectName = '';
  theme = 'deltalax-light-theme';
  @HostBinding('class') componentCssClass;

  constructor(
    private configService: ConfigurationService,
    private overlayContainer: OverlayContainer,
    private store: Store<fromStore.State>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    this.config = this.configService.getConfig();
    /**
     * add google analytics
     */
    ga('create', this.config.gaCode, 'auto');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });

  }

  // set page title
  ngOnInit() {
    this.projectName = this.config.projectName;
    this.externalLink = this.config.externalLink;
    this.feedbackLink = this.config.feedbackLink;

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
      )
      .subscribe((event) => {
        const pathUri = event.snapshot['_routerState'].url;
        const currentPathSegments = pathUri.split('/');
        const dashboard = this.config.dashboard;
        let projectTitle = dashboard + ' | ' + this.projectName;
        for (const s of currentPathSegments) {
          if (s) {
            if (s === 'dashboard') {
              continue;
            }
            projectTitle += ' | ' +  s;
          }
        }
        this.titleService.setTitle(projectTitle);
      });
  }
  /**
   * @param newTitle String designating the new page title
   */
  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  /**
   * @returns The current page title
   */
  getTitle(): string {
    return this.titleService.getTitle();
  }

  /**
   * @param themeSettings Object with darkMode and theme properties
   */
  changeTheme(themeSettings: { darkMode: boolean; theme: string }) {
    const { darkMode, theme } = themeSettings;
    /** set component class */
    const currentTheme = this.overlayContainer.getContainerElement().classList.item(1);
    if (currentTheme === null) {
      this.overlayContainer.getContainerElement().classList.add(theme);
    } else {
      this.overlayContainer.getContainerElement().classList.replace(currentTheme, theme);
    }
    this.componentCssClass = theme;
    /** set current theme in state */
    this.store.dispatch(new ToolbarActions.DarkModeChange({ darkMode }));
  }
}
