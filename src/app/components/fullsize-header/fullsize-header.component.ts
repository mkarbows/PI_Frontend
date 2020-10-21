/**
 * @author Arup
 * @description
 * Header for fullsize item components. Contains logic
 * for getting next/prev items
 **/

import {
  Injectable,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { ConfigurationService } from '../../core/configuration.service';
import { PiConfig } from '../../core/app-config';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-fullsize-header',
  templateUrl: './fullsize-header.component.html',
  styleUrls: ['./fullsize-header.component.css']
})
export class FullsizeHeaderComponent {
  config: PiConfig = this.configService.getConfig();
  apiRoot: string = this.config.apiRoot;

  /** url_endpoint of the current item */
  @Input() currentEndpoint: string;
  /** array of inputs needed for next/prev logic */
  @Input() selectedItemType: string;
  @Input() mapMarkerClicked: boolean;
  @Input() selectedNavType: string;
  @Output() closeFullsizeComponent: EventEmitter<any> = new EventEmitter();

  constructor(
    private configService: ConfigurationService,
  ) { }

  openItem() {
    if (this.selectedNavType === 'specification') {
      window.open(
        `${this.apiRoot}/${this.selectedNavType}s/${this.currentEndpoint}/?viewer=download`
      );
    } else {
      window.open(
        `${this.apiRoot}/${this.selectedNavType}files/${this.currentEndpoint}/?viewer=download`
      );
    }
  }

  /**
   * Close fullsize component
   */
  close() {
    this.closeFullsizeComponent.emit();
  }
}
