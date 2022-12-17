import { Component, OnInit } from '@angular/core';
import { ChienService } from 'src/app/services/chien.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from "sweetalert2"
import { getCurrencySymbol } from '@angular/common';
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
       },
       error=> {
         console.log(error);
       }   );
     //this.routes.navigate(['/update-chien']);
   }
 

   updatestate(){
    Swal.fire({
      title:"Voulez-vous vraiment confirmer l'état sanitaire de ce Chien",
      text :"Aprés cette confirmation le chien sera prêt pour adoption",
      icon : 'warning' ,
      showCancelButton : true ,
      confirmButtonText : "confirmer" ,
      confirmButtonColor: '#228B22',
      cancelButtonText: 'Annuler',
      cancelButtonColor :'	#FF0000',
      showLoaderOnConfirm: true
    }).then((result)=>{
      if(result.value){
        this.currentChien.state = true
        Swal.fire(
          'Prêt pour adoption !!!',
           "l'état sanitaire de ce chien est mise à jour avec succées" ,
           'success'
                  );}
            else if (result.dismiss === Swal.DismissReason.cancel){
              Swal.fire('Encore malade',"Ce chien n'est pas prêt pour adoption",'error');
              
            }
    }) 
      
   }




}
