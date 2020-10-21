import {
  Injectable,
  Component,
  OnInit,
  Inject,
  OnDestroy
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfigurationService } from '../../../core/configuration.service';
import { PiConfig } from '../../../core/app-config';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css']
})
export class PdfViewerComponent implements OnInit {
  config: PiConfig = this.configService.getConfig();
  apiRoot: string = this.config.apiRoot;

  navTypeQuery: string;

  constructor(
    private configService: ConfigurationService,
    public dialogRef: MatDialogRef<PdfViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    if (this.data.type === 'specification') {
      this.navTypeQuery = 'specifications';
    } else { // if (this.data.type === 'progress') { --> please fix in DELTALAX-1083
      this.navTypeQuery = 'drawingfiles';
    }
  }

}
