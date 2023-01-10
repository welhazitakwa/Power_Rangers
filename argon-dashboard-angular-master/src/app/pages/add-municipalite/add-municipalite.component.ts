import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MunicipaliteService } from 'src/app/services/municipalite.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-add-municipalite',
  templateUrl: './add-municipalite.component.html',
  styleUrls: ['./add-municipalite.component.css'],
})
export class AddMunicipaliteComponent implements OnInit {

  municipalite={

nameMunicipalite:'',
localisationMunicipalite:'',
  }

  submitted= false;

  constructor(private municipaliteService : MunicipaliteService, private route: Router) { }

  ngOnInit(): void {

  }

  savemunicipalite(){
    const data ={
      nameMunicipalite: this.municipalite.nameMunicipalite,
      localisationMunicipalite: this.municipalite.localisationMunicipalite

    };
    this.municipaliteService.create(data)
    .subscribe(
      response =>{
        console.log(response);
        this.submitted=true;
      },
      error=> {
        console.log(error);
      }
    );
    this.route.navigateByUrl("/dashboard")
  }

  newMunicipalite(){
    this.submitted=false;
    this.municipalite={
      nameMunicipalite:'',
      localisationMunicipalite:'',
    }
  }

  removemunicipalite(){

  }




}
