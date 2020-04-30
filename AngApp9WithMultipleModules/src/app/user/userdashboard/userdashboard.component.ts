import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  constructor(private ar:ActivatedRoute,private hc:HttpClient,private router:Router) { }

  username:string;
  userObj: User;
  imgUrl:string;

  ngOnInit(): void {
    this.ar.paramMap.subscribe(param=>{

      this.username=param.get("username");

       this.hc.get<User>(`/user/profile/${this.username}`).subscribe((objOfres)=>{

         if(objOfres["message"]=="Unauthorized access")
         {
           alert("You are unauthorized to access..plz login to continue")
         }
         else if(objOfres["message"]=="session has expired")
         {
           alert("Your session is expired..plz relogin to continue");
           this.router.navigate(['../login']);

         }
         else{
         

           this.userObj=objOfres["userObj"];
           console.log("userObj",this.userObj)
           this.imgUrl=this.userObj.profileImage;

         }
            
       })
    });
    
  }


 
  

}
