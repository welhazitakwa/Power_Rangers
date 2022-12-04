import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChienService } from 'src/app/services/chien.service';

@Component({
  selector: 'app-detail-chien',
  templateUrl: './detail-chien.component.html',
  styleUrls: ['./detail-chien.component.css']
})
export class DetailChienComponent implements OnInit {
  currentChien:any;
  id: any;
  constructor(private chienService: ChienService, private activatedRoute: ActivatedRoute, private routes :Router) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    
    this.chienService.get(this.id).subscribe(
      response =>{

        console.log(response);
        
      },
      error=> {
        console.log(error);
      }
      
    );

    //this.message='';
    this.getChien(this.id);





  }




  getChien(id){
    this.chienService.get(id).subscribe(
    response =>{
 
     this.currentChien =response;
     console.log(response);
     
   },
   error=> {
     console.log(error);
   }
   
 );
   }

}
