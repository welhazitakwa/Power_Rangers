import { Component, OnInit } from '@angular/core';
import { ChienService } from 'src/app/services/chien.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileHandle } from './file-handle.model';

@Component({
  selector: 'app-add-chien',
  templateUrl: './add-chien.component.html',
  styleUrls: ['./add-chien.component.css']
})
export class AddChienComponent implements OnInit {
  registerForm! : FormGroup
  submitted = false
    
  chien={
    nameChien:'',
    gender:'',
    color:'',
    age:0,
    image:'',
    state:false,
    description:''
      }

     
  constructor(private chienService: ChienService,
    private formBuilder : FormBuilder ,private sanitizer: DomSanitizer) { }

  get nameChien() {
    console.log(this.registerForm.get('chien.nameChien'))
    return this.registerForm.get('chien.nameChien')
  }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      
      chien: this.formBuilder.group({
        nameChien:new FormControl('', [Validators.required])
        // ['', [Validators.required, Validators.minLength(2)]]
      })
      
    })
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

  
  



onSubmit(){
  this.submitted= true
  if (this.registerForm.invalid) {return}
  alert ("success")

  
}


/*
    onFileSelected(event) {
      //console.log(event);``
      if (event.target.files) {
        const file = event.target.files[0];

        const fileHandle : FileHandle ={
          file: file ,
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(file)
          )
        }
        this.chien.image.push(fileHandle);
      }
    }*/
   
}
