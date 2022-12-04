import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MunicipaliteService } from 'src/app/services/municipalite.service';

@Component({
  selector: 'app-update-municipalite',
  templateUrl: './update-municipalite.component.html',
  styleUrls: ['./update-municipalite.component.css']
})
export class UpdateMunicipaliteComponent implements OnInit {

  municipalite={
    
    nameMunicipalite:'',
    localisationMunicipalite:'',
      }
      currentMunicipalite:any;
      municipalites:any;
      currentIndex=-1;
      message='';
  id: any;


  constructor(private municipaliteService: MunicipaliteService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private routes :Router) { 
  }

  ngOnInit(): void {
   /* const data ={
      nameMunicipalite: this.municipalite.nameMunicipalite,
      localisationMunicipalite: this.municipalite.localisationMunicipalite

    };*/

    /*this.currentMunicipalite=this.municipaliteService.get(this.activatedRoute.snapshot.params['id']);
    console.log(this.currentMunicipalite);*/
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.municipaliteService.get(this.id).subscribe(
      response =>{

        console.log(response);
        
      },
      error=> {
        console.log(error);
      }
      
    );

    //this.message='';
    this.getMunicipalite(this.id);
  }

  getMunicipalite(id){
   this.municipaliteService.get(id).subscribe(
   response =>{

    this.currentMunicipalite =response;
    console.log(response);
    
  },
  error=> {
    console.log(error);
  }
  
);
  }



 /* retriveMunicipalite(){
    this.municipaliteService.getAll().subscribe(
      response =>{
      this.municipalites=response;
        console.log(response);
        
      },
      error=> {
        console.log(error);
      }
      
    );
  }*/

  updatemunicipalite(){
   /* const data ={
      nameMunicipalite: this.municipalite.nameMunicipalite,
      localisationMunicipalite: this.municipalite.localisationMunicipalite

    };*/

   /* const data ={
      nameMunicipalite: this.currentMunicipalite.nameMunicipalite,
      localisationMunicipalite: this.currentMunicipalite.localisationMunicipalite

    }*/

    this.municipaliteService.update(this.id,this.currentMunicipalite).subscribe(
      response =>{

        console.log(response);
        //this.message="the municipalite was update successfully";
        
      },
      error=> {
        console.log(error);
      }
      
    );
    this.routes.navigate(['/update-municipalite']);
  }

}

