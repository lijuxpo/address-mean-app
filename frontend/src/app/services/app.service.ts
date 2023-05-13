import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  public masterDataUrl: string;
  constructor(
    private http: HttpClient,
  ) {
    this.masterDataUrl = 'http://localhost:3000/';
  }


  searchByAddress() {
    const url = this.masterDataUrl + `api/postcode/`;
    return this.http.get(url)
      .pipe(map(response => {
        return response;
      }));
  }

  getDetails(id: Number) {
    const url = this.masterDataUrl + `api/list/` + id;
    return this.http.get(url)
      .pipe(map(response => {
        return response;
      }));
  }
}
