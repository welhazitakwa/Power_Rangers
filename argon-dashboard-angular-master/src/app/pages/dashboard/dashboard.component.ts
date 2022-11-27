import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { MunicipaliteService } from 'src/app/services/municipalite.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  [x: string]: any;
  API_URL = 'http://localhost:8090/municipalites | async';
  municipalites: any[];
  public clicked: boolean = true;
  public clicked1: boolean = false;

  currentMunicipalite=null;
  message="";

  
constructor(private http: HttpClient,private municipaliteService: MunicipaliteService, route: ActivatedRoute, router: Router ){

this.municipalites=[];
}
  ngOnInit() {
    this.loadMunicipalites() ;
    this.message="";
    //this.getMunicipalite(this.route.snapshot.paramMap.get('id'));
  }


  getMunicipalite(id){
    this.municipaliteService.get(id)
    .subscribe(
      data =>{

        this.currentMunicipalite= data;
        console.log(data);
      },
      error=> {
        console.log(error);
      }
      
    );
  }


 

  
  
 
  loadMunicipalites(){
    
    this.http
     .get('http://localhost:8090/municipalites')
     .subscribe((result:any)=>{
       this.municipalites = result ;
      //console.log(this.municipalites)
       
    });
    
  }

  retriveMunicipalite(){
    this.municipaliteService.getAll()
    .subscribe((result:any)=>{
      this.municipalites = result ;
     //console.log(this.municipalites)
      
   });
  }

  /*refrechMunicipalite(){
    this.retriveMunicipalite();
  }*/

  reloadCurrentPage() {
    window.location.reload();
   }


  deleteMunicipalite(g){
  
    this.municipaliteService.delete(g)
    .subscribe(
      response =>{
        console.log(response);
        this.router.navigate([''])
      },
      error=> {
        console.log(error);
      }
    )
    //this.loadMunicipalites();
    this.reloadCurrentPage();
  }


}
