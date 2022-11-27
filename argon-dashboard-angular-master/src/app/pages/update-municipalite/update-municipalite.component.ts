import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private municipaliteService: MunicipaliteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.currentMunicipalite=this.municipaliteService.get(this.activatedRoute.snapshot.params['id']);
    console.log(this.currentMunicipalite);
  }

}
