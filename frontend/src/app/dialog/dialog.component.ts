import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [ './dialog.component.scss' ]
})
export class DialogComponent implements OnInit {

  public message: any;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.message = this.dialogRef._containerInstance._config.data;
  }

  onClose() {
    this.dialogRef.close(false);
  }

  onProceed() {
    this.dialogRef.close(true);
  }

}