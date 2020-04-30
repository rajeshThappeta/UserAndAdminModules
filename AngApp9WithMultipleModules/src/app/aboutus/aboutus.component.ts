import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

   receivedData:object[]=[];

  //inject DataService obj
  constructor(private ds:DataService) { }

  ngOnInit(): void {
    this.ds.makeAHttpReq().subscribe((res)=>{
          console.log(res);
           this.receivedData=res["data"];
         });
  }

}
