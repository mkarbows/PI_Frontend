import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DrawingThumbnailItem } from 'src/app/shared/models/item.model';

export interface DialogData {
  item: DrawingThumbnailItem;
  index: number;
}

@Component({
    selector: 'app-item-fullsize-dialog-delete-component',
    templateUrl: './markup-delete-dialog.component.html',
    styleUrls: ['./markup-delete-dialog.component.css']
  })

export class MarkupDeleteDialogComponent {

  item: DrawingThumbnailItem;
  index: number;

  constructor(
      public dialogRef: MatDialogRef<MarkupDeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public dialogData: DialogData) {
        this.item = dialogData.item;
        this.index = dialogData.index;
      }

      onNoClick(): void {
        this.dialogRef.close();
      }

      onYesClick(): void {
        this.dialogRef.close(this.item.markups[this.index].url_endpoint);
      }

}
