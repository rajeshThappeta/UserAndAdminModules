import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SquarePipe } from './square.pipe';
import { SquarerootPipe } from './squareroot.pipe';
import { AuthorizationService } from './authorization.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutusComponent,
    SquarePipe,
    SquarerootPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
