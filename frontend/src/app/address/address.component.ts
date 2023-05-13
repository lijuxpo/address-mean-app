import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DialogComponent } from 'src/app/dialog/dialog.component';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: [ './address.component.scss' ]
})
export class AddressComponent implements OnInit {
  public addressForm: FormGroup;
  public addressId: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.addressId = this.activatedRoute.snapshot.paramMap.get('id');
    this.addressForm = this.formBuilder.group({
      AID: [ '', [ Validators.required ] ],
      Address: [ '', [ Validators.required ] ],
      Suburb: [ '', [ Validators.required ] ],
      Postcode: [ '', [ Validators.required ] ]
    });
    if (this.addressId) {
      this.setFormValues()
    }
  }

  setFormValues() {
    this.appService.searchByAddress(this.addressId).subscribe(data => {
      if (data) {
        this.addressForm.get('AID').setValue(data[ 0 ].AID);
        this.addressForm.get('Address').setValue(data[ 0 ].Address);
        this.addressForm.get('Suburb').setValue(data[ 0 ].Suburb);
        this.addressForm.get('Postcode').setValue(data[ 0 ].Postcode);
      }
    });

  }

  ngOnInit(): void {
  }
  onSave() {
    const formData = this.addressForm.getRawValue();
    this.appService.createAddress(formData, this.addressId).subscribe(r => {
      this.router.navigateByUrl('/');
      this.snackBar.open((this.addressId ? 'Updated' : 'Created') + ' Succesfully!', 'Close', {
        duration: 2000
      });
    });
  }

  delete(id) {
    this.dialog.open(DialogComponent,
      {
        minWidth: '400px',
        maxWidth: '420px',
        disableClose: true,
        data: {
          title: 'Delete Confirmation',
          description: 'Are you sure you want to delete this?'
        }
      }).afterClosed().subscribe((proceed) => {
        if (proceed) {
          this.appService.deleteAddress(id).subscribe(r => {
            this.snackBar.open('Deleted Succesfully!', 'Close', {
              duration: 2000
            });
          });
        }
      });
  }

}
