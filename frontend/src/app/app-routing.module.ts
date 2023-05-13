import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { AddressComponent } from 'src/app/address/address.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'address',
    component: AddressComponent
  },
  {
    path: 'address/:id',
    component: AddressComponent
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
