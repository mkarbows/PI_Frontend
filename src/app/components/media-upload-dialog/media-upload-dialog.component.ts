import {
  Component,
  Inject,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy
} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExceptionService } from '../../services/exception.service';

// model
import { MediaItem } from '../../shared/models/item.model';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';

import { ConfigurationService } from '../../core/configuration.service';
import { PiConfig } from '../../core/app-config';
import * as fromStore from '../../store';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';


@Component({
  selector: 'app-media-upload-dialog',
  templateUrl: './media-upload-dialog.component.html',
  styleUrls: ['./media-upload-dialog.component.css'],
})

export class MediaUploadDialogComponent implements OnInit, OnDestroy {
  config: PiConfig = this.configService.getConfig();
  apiRoot: string = this.config.apiRoot;

  public uploader: FileUploader = new FileUploader({
    url: ''
  });
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  errorMessage: string;
  file: File;
  errorOccured: boolean;
  progress: number;
  levelsSubscription: Subscription;
  disciplinesSubscription: Subscription;
  levels: string[] = [];
  disciplines: string[] = [];

  public username: string;
  public level: string;
  public discipline: string;
  public filename: string;
  public uploading: boolean;

  @Output() uploadMediaFile: EventEmitter<MediaItem> = new EventEmitter<MediaItem>();


  constructor(
    private configService: ConfigurationService,
    private http: HttpClient,
    private exceptionService: ExceptionService,
    private store: Store<fromStore.State>,
    public dialogRef: MatDialogRef<MediaUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public mediaData: any) {
      this.uploader.setOptions({
        url: `${this.apiRoot}/mediafiles/`,
      });
      this.filename = 'Choose a File';
      let username = localStorage.getItem('username');
      if (username === null) {
        username = '';
      }
      this.username = username;
      this.hasBaseDropZoneOver = false;
      this.hasAnotherDropZoneOver = false;
      this.response = '';
      this.uploader.response.subscribe( res => this.response = res );

      this.levelsSubscription = store
      .select(fromStore.getLevels)
      .subscribe((levels: any) => {
        levels.forEach(level => {
          if (level.level_number !== 'SELECT ALL') {
            this.levels.push(level.level_number);
          }
        });
      });
      this.disciplinesSubscription = store
      .select(fromStore.getDisciplineFilters)
      .subscribe((disciplines) => {
        disciplines.forEach(discipline => {
          if (discipline.title !== 'Select All') {
            this.disciplines.push(discipline.title);
          }
        });
      });
    }

    public fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
      this.hasAnotherDropZoneOver = e;
    }

    ngOnInit() {
      this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
        form.append('username', this.username);
        form.append('discipline', this.discipline);
        form.append('level', this.level);
      };
      this.uploader.onErrorItem = (item, response, status, headers) => this.onErrorItem(item, response, status, headers);
      this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
    }
    setLevel(level) {
      this.level = level;
    }
    setDiscipline(discipline) {
      this.discipline = discipline;
    }
    onSuccessItem(item: any, response: string, status: number, headers: ParsedResponseHeaders): any {
      const result = JSON.parse(response);
      this.dialogRef.close(item);
      if (result !== undefined) {
        this.uploadMediaFile.emit(item);
      }
    }
    onErrorItem(item: any, response: string, status: number, headers: ParsedResponseHeaders): any {
      const parsedResponse = JSON.parse(response);
      try {
        this.errorMessage = parsedResponse.Error;
      } catch (error) {
        this.errorMessage = 'Error: An error occurred while uploading media item.';
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
      this.file = event.target.files[0];
    }

    onFileSelected(event) {
      this.uploader.queue[0].alias = 'files';
      if (this.uploader.queue.length > 1) {
        this.uploader.queue[0].remove();
      }
      const path = event.target.value;
      if (path !== '') {
        const file = path.split('\\');
        this.filename = file[file.length - 1];
        this.file = event.target.value;
        event.srcElement.value = '';
      }
      if (this.uploader.queue.length > 1) {
        this.uploader.queue[0].remove();
      }
    }

    /** Builds FormData and uploads it */
    onSubmit(form) {
      if (this.uploader.queue.length < 1) {
        this.errorMessage = 'No image file loaded. Please select a image file for upload.';
        return;
      }
      this.username = form.value.username;
      localStorage.setItem('username', this.username);
      form.value.level = this.level;
      form.value.discipline = this.discipline;
      this.uploading = true;
      this.errorMessage = '';
      this.uploader.uploadAll();
    }

    ngOnDestroy() {
      this.levelsSubscription.unsubscribe();
      this.disciplinesSubscription.unsubscribe();
    }
}
