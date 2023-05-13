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


  searchByAddress(id?: any) {
    let url = this.masterDataUrl + `api/postcode/`;
    if (id) {
      url = url + id;
    }
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

  deleteAddress(id: String) {
    const url = this.masterDataUrl + `api/address/delete/` + id;
    return this.http.get(url)
      .pipe(map(response => {
        return response;
      }));
  }

  createAddress(req: any, id?) {
    let url = this.masterDataUrl + `api/address`;
    if (id) {
      url = url + '/edit';
    }
    return this.http.post(url, req)
      .pipe(map(response => {
        return response;
      }));
  }
}
