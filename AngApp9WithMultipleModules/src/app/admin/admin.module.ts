import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';


@NgModule({
  declarations: [AdmindashboardComponent, AdminprofileComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
