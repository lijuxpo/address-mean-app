import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from './services/app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  myControl = new FormControl('');
  result: any;
  details: any;
  myControlx = new FormControl('');
  resultx: any;
  filteredOptions: any;

  constructor(
    private appService: AppService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.appService.searchByAddress().subscribe(response => {
      this.resultx = response;
    });
    this.filteredOptions = this.myControlx.valueChanges.pipe(
      startWith(''),
      map(value => this.filterx(value))
    );
  }

  openDialog(): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px'
    });
  }


  searchAccounts(value: any) {
    console.log(value);

    /* this.appService.searchByAddress(value).subscribe(response => {
      this.result = response;
    }); */
  }

  filterValue(details: any) {
    this.appService.getDetails(details.AID).subscribe(response => {
      this.details = response;
    });
  }

  redirect() {
    this.router.navigateByUrl('/address');
  }

  filterx(value: string): string[] {
    const filterValue = value.toLowerCase();

    return filterValue ? this.resultx.filter((option: any) => {
      if (option.Address && option.Suburb && option.Postcode) {
        if (option.Address.includes(filterValue) || option.Suburb.includes(filterValue) || String(option.Postcode).includes(filterValue)) {
          return option;
        }
      }
    }) : [];
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) { }
}



