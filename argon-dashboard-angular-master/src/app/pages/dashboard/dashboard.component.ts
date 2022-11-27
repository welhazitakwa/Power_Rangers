import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  API_URL = 'http://localhost:8090/municipalites | async';
  municipalites: any[];
  public clicked: boolean = true;
  public clicked1: boolean = false;
constructor(private http: HttpClient){

this.municipalites=[];
}
  ngOnInit() {
    this.loadMunicipalites() ;
  }
  
 
  loadMunicipalites(){
    
    this.http
     .get('http://localhost:8090/municipalites')
     .subscribe((result:any)=>{
       this.municipalites = result ;
      console.log(this.municipalites)
       
    });
    
  }


}
