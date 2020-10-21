import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

import { ConfigurationService } from 'src/app/core/configuration.service';
import { PiConfig, ExternalLink, FeedbackLink } from 'src/app/core/app-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() externalLink: ExternalLink;
  @Input() feedbackLink: FeedbackLink;
  @Output() setTheme: EventEmitter<object> = new EventEmitter<object>();
  darkMode = false;
  config: PiConfig;
  dashboard = '';
  projectName = '';

  constructor(private configService: ConfigurationService) {}

  ngOnInit() {
    this.config = this.configService.getConfig();
    this.dashboard = this.config.dashboard;
    this.projectName = this.config.projectName;
  }

  openLiveCam() {
    window.open(this.externalLink.path, '_blank');
  }

  openTeams() {
    // window.open('mailto:roland.martin@arup.com; megan.karbowski@arup.com');
    window.open(this.feedbackLink.path);
  }

  /**
   * Method to switch between dark and light
   * themes
   * @param theme Theme name
   */
  changeTheme(theme: string) {
    this.darkMode = !this.darkMode;
    /** emit event to change theme */
    this.setTheme.emit({ theme, darkMode: this.darkMode });
  }
}
