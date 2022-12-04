import { Component, OnInit } from '@angular/core';
import { ChienService } from 'src/app/services/chien.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-etat',
  templateUrl: './update-etat.component.html',
  styleUrls: ['./update-etat.component.css']
})
export class UpdateEtatComponent implements OnInit {

  chien={
    nameChien:'',
    gender:'',
    color:'',
    age:0,
    image:'',
    state:false,
    description:''
      }
      currentChien:any;
      id:any;

  constructor(private chienService: ChienService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private routes :Router) { }

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




   updatechien(){

 
     this.chienService.update(this.id,this.currentChien).subscribe(
       response =>{
 
         console.log(response);
         //this.message="the municipalite was update successfully";
         
       },
       error=> {
         console.log(error);
       }
       
     );
     //this.routes.navigate(['/update-chien']);
   }
 






}
