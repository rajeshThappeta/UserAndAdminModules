import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { User } from '../user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //inject register service obj
  constructor(private rs:RegisterService,private router:Router) { }

  ngOnInit(): void {
  }



       file: File;
  
       imageUrl: string | ArrayBuffer ="https://bulma.io/images/placeholders/480x480.png";

       fileName: string = "No file selected";
       
  onChange(file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;

      /*The FileReader object lets web applications asynchronously 
      read the contents of files (or raw data buffers) stored on the user's computer,
       using File or Blob objects to specify the file or data to read. */
       //Returns a newly constructed FileReader.
      const reader = new FileReader();
      //The readAsDataURL method is used to read the contents of the specified Blob or File
      reader.readAsDataURL(file);

      /*A handler for the load event. This event is triggered 
      each time the reading operation is successfully completed.
      The FileReader.onload property contains an event handler
       executed when the load event is fired*/
      reader.onload = () => {
        /*  the result attribute contains the data as a data: URL
         representing the file's data as a base64 encoded string.*/
        this.imageUrl = reader.result;
        console.log("img url:",this.imageUrl);
        console.log("file is :",this.file);
        console.log("event is :",event);
        console.log("reader is :" ,reader)
      };
    }
  }

  submit(formObj:NgForm)
  {

    let user:User=formObj.value;
    //formdata obj preperation
    let formData=new FormData();

      //append image to it
      formData.append("photo",this.file);
      formData.append("userObj",JSON.stringify(user));
      
      console.log("user obj is ",formObj.value);
      this.rs.doRegister(formData).subscribe((result)=>{
        
       if( result["message"]=="user existed")
       {
         alert("user already existed");
         formObj.reset();
       }
       if( result["message"]=="user created")
       {
         alert("user created successfully");
        //redirect to login page
          this.router.navigate(['./login']);
       }
      })

  }
    
}








      
  



