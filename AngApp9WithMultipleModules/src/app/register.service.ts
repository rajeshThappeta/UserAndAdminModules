import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private hc:HttpClient) { }

  doRegister(forDataObj:FormData):Observable<any>
  {
    //make http post req
   return  this.hc.post('/user/register',forDataObj);

  }
}
