import {
  Injectable,
  Component,
  Inject,
  Output,
  EventEmitter,
  Input,
  OnInit
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExceptionService } from '../../services/exception.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

import { ConfigurationService } from '../../core/configuration.service';
import { PiConfig } from '../../core/app-config';

@Injectable({
  providedIn: 'root'
})

@Component({
    selector: 'app-item-fullsize-dialog-upload-component',
    templateUrl: 'markup-upload-dialog.component.html',
    styleUrls: ['./markup-upload-dialog.component.css']
})

export class UploadDialogComponent implements OnInit {
  config: PiConfig = this.configService.getConfig();
  apiRoot: string = this.config.apiRoot;

  public uploader: FileUploader = new FileUploader({
    url: ''
  });
  errorMessage: string;
  files: File;
  errorOccured: boolean;
  progress: number;
  username: string;
  comments: string;
  title: string;
  filename: string;
  uploading: boolean;

  constructor(
    private configService: ConfigurationService,
    private http: HttpClient,
    private exceptionService: ExceptionService,
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public drawingData: any) {
      this.errorOccured = false;
      this.uploader.setOptions({
        url: `${this.apiRoot}/drawingfiles/${drawingData.url}/markup/`
      });
      this.filename = 'Choose a File';
      let username = localStorage.getItem('username');
      if (username === null) {
        username = '';
      }
      this.username = username;
    }

  ngOnInit() {
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('title', this.title);
      form.append('comments', this.comments);
      form.append('username', this.username);
      };
    this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    const result = JSON.parse(response);
    this.dialogRef.close(result);
  }

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    try {
      this.errorMessage = JSON.parse(response).status.message;
    } catch (error) {
      this.errorMessage = 'Error: An error occurred while uploading a markup. Please contact the system administrator.';
    }
    this.uploader.queue.forEach (file => {
      file.isUploaded = true;
      file.isReady = false;
      file.isUploading = false;
      file.isUploaded = false;
      file.isSuccess = false;
      file.isCancel = false;
      file.isError = false;
      file.progress = 0;
    });
    this.uploading = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  fileInputHandler(event) {
    this.files = event.target.files[0];
  }

  onFileSelected(event) {
    if (this.uploader.queue.length > 1) {
      this.uploader.queue[0].remove();
    }
    const path = event.target.value;
    if (path !== '') {
      const file = path.split('\\');
      this.filename = file[file.length - 1];
      this.files = event.target.value;
      event.srcElement.value = '';
    }
    if (this.uploader.queue.length > 1) {
      this.uploader.queue[0].remove();
    }
  }

  /** Builds FormData and uploads it */
  onSubmit(form) {
    if (this.uploader.queue.length < 1) {
      this.errorMessage = 'No PDF File loaded. Please select a PDF file for upload.';
      return;
    }
    this.username = form.value.username;
    localStorage.setItem('username', this.username);
    this.comments = form.value.comments;
    this.title = form.value.title;
    this.uploading = true;
    this.errorMessage = '';
    this.uploader.uploadAll();
  }
}
