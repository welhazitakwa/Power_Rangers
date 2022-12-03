import { Component, OnInit } from '@angular/core';
import { ChienService } from 'src/app/services/chien.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-chien',
  templateUrl: './add-chien.component.html',
  styleUrls: ['./add-chien.component.css']
})
export class AddChienComponent implements OnInit {




  
  chien={
    nameChien:'',
    gender:'',
    color:'',
    age:0,
    image:'',
    state:false,
    description:''
      }
      submitted= false;
  constructor(private chienService: ChienService) { }

  ngOnInit(): void {
  }


  savechien(){
    const data ={
      nameChien: this.chien.nameChien,
      gender: this.chien.gender,
      color: this.chien.color ,
      age: this.chien.age ,
      image: this.chien.image,
      state: false ,
      description : this.chien.description

    };
    this.chienService.create(data)
    .subscribe(
      response =>{

        console.log(response);
        this.submitted=true;
      },
      error=> {
        console.log(error);
      }
      
    );
  }

  newChien(){
    this.submitted=false;
    this.chien={
      nameChien:'',
      gender:'',
      color:'',
      age:0,
      image:'',
      state:false,
      description:''
    }
  }

  
  





}
