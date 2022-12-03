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
      currentMunicipalite=null;
  id: any;

  constructor(private municipaliteService: MunicipaliteService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private routes :Router) { 
  }

  ngOnInit(): void {
    const data ={
      nameMunicipalite: this.municipalite.nameMunicipalite,
      localisationMunicipalite: this.municipalite.localisationMunicipalite

    };

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
  }

  updatemunicipalite(){
    const data ={
      nameMunicipalite: this.municipalite.nameMunicipalite,
      localisationMunicipalite: this.municipalite.localisationMunicipalite

    };
    this.municipaliteService.update(this.id,data).subscribe(
      response =>{

        console.log(response);
        
      },
      error=> {
        console.log(error);
      }
      
    );
  }

}
