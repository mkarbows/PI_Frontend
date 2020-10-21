import {
  Injectable,
  Component,
  OnInit,
  Inject
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExceptionService } from '../../../services/exception.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ConfigurationService } from '../../../core/configuration.service';
import { PiConfig } from '../../../core/app-config';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  config: PiConfig = this.configService.getConfig();
  apiRoot: string = this.config.apiRoot;

  constructor(
    private configService: ConfigurationService,
    private http: HttpClient,
    private exceptionService: ExceptionService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
  }

}
