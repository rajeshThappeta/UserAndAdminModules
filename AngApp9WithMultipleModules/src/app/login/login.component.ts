import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //inject ROuter object
  constructor(private router:Router,private ls:LoginService) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.ls.logout();
    }, 0);
   

  }

  doLogin(ngFormObj:NgForm)
  {

    console.log("ibj is ",ngFormObj.value)
    let obj=ngFormObj.value;
    //admin validation & verification
      if(obj.role=="admin")
      {

          
      }
      //user validation & verification
      if(obj.role=="user")
      {
        this.ls.login(obj).subscribe((res)=>{

              if(res["message"]=="invalid username")
              {
                alert("Wrong username ..plz enter right one");
               
                ngFormObj.controls.username.reset();
              }

              if(res["message"]=="invalid password")
              {
                alert("Wrong password ..plz enter right one") ;
              }
              if(res["message"]=="success"){

                //save hashed token in browser's memory
                localStorage.setItem("signedJwtToken",res["token"]);

                //update user status in Login Service
                this.ls.loggedInUsername=res["username"];
                this.ls.isLoggedIn=true;


               //navigate to userdashboard
               this.router.navigate(['../userdashboard',res["username"]]);
              }
        });

      }
  }

}
