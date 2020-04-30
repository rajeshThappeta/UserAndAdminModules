import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //make a http get req
    //inject HttpClient obj
      constructor(private hc:HttpClient) { }

    //make req
    makeAHttpReq():Observable<object>
    {
     return  this.hc.get<object>("https://reqres.in/api/users?page=2");
    }
  
}
