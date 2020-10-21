import {
  Injectable,
  Component,
  Input
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExceptionService } from '../../services/exception.service';

// models
import { MediaThumbnailItem } from '../../shared/models/item.model';

import { ConfigurationService } from '../../core/configuration.service';
import { PiConfig } from '../../core/app-config';

@Injectable({
  providedIn: 'root'
})

/**
 * @author Arup
 * @description
 * Media thumbnail item component.
 **/
@Component({
  selector: 'app-media-item',
  templateUrl: './media-item.component.html',
  styleUrls: ['./media-item.component.css']
})
export class MediaItemComponent {
  config: PiConfig = this.configService.getConfig();
  apiRoot: string = this.config.apiRoot;

  @Input() thumbnail: MediaThumbnailItem;

  constructor(
    private configService: ConfigurationService,
    private http: HttpClient,
    private exceptionService: ExceptionService
  ) { }
}
