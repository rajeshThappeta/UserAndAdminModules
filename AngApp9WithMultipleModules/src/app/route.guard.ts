import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  canActivate( ): boolean{


    //get token from local storage
    let token=localStorage.getItem("signedJwtToken");

    if(token==undefined)
    {
      alert("You need to login to access this route");
      return false;
    }
    else{
      return true;
    }
    
  }
  
}
