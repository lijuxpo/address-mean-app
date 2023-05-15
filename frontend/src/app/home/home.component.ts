
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../services/app.service';
import { DialogComponent } from 'src/app/dialog/dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
  details: any;
  search = new FormControl('');
  results: any;
  filteredOptions: any;

  constructor(
    private appService: AppService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.appService.searchByAddress().subscribe(response => {
      this.results = response;
    });
    this.filteredOptions = this.search.valueChanges.pipe(
      startWith(''),
      map(value => this.filterDetails(value))
    );
  }

  filterValue(details: any) {
    this.appService.getDetails(details.AID).subscribe(response => {
      this.details = response;
    });
  }

  redirect(id: any) {
    this.router.navigateByUrl('/address/' + id);
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
            this.details = null;
            this.search.setValue(null);
            this.snackBar.open('Deleted Succesfully!', 'Close', {
              duration: 2000
            });
          });
        }
      });
  }

  filterDetails(value: string): string[] {
    const filterValue = value ? value.toLowerCase() : '';
    return filterValue ? this.results.filter((option: any) => {
      if (option.Address && option.Suburb && option.Postcode) {
        if (option.Address.toLowerCase().includes(filterValue) || option.Suburb.toLowerCase().includes(filterValue) || String(option.Postcode).includes(filterValue)) {
          return option;
        }
      }
    }) : [];
  }
}






