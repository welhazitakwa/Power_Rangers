import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Roles} from '../../common/Roles';
import {Employee} from '../../common/employee';
import {of} from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  file: File
  user={

    name:'',
    email: '',
    jobTitle: '',
    image: ''
  }
  employee: Employee
  id: number = 0
  userForm: FormGroup
  roles: Roles[] = []
  municipalites: any = []
  constructor(private userService: UserService, private activateRoute: ActivatedRoute, private route : Router) { }

   async ngOnInit(): Promise<void> {
    this.userService.getRoles().subscribe(
      (data) => {
        this.roles = data
        if (localStorage.getItem("Roles") == "[ADMIN]") {
          this.roles = this.roles.splice(3).splice(0, 1)
        } else if (localStorage.getItem("Roles") == "[MAIRE]") {
          this.roles = this.roles.splice(1, 2)
        }
      })
     this.userService.getMuniciaplites().subscribe(
       (data) => {
         this.municipalites = data
       }
     )
     this.userForm = new FormGroup(
       {
         name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
         email: new FormControl(null, [Validators.required, Validators.email]),
         image: new FormControl(null, [Validators.required]),
         roles: new FormControl(null, [Validators.required]),
         municpalite: new FormControl(null, [Validators.required])
       }
     )
    this.id = this.activateRoute.snapshot.params['id']
    if (this.id == undefined) this.id = 0
     if (this.id != 0) {
       this.userService.get(this.id).subscribe(
        (data) => {
          this.employee = data
          this.user.name = data.name
          this.user.email = data.email
          this.user.image = data.image
          this.user.jobTitle = data.role.name
        }
      )
    } else {

     }
  }

  saveUser() {
    console.log(this.userForm)
    if (this.userForm.status == "INVALID") {
      this.userForm.markAllAsTouched()
    } else {
      of(this.userForm.value).subscribe(
        (data) => {
          this.employee = data
          this.employee.id = this.id
          console.log(this.employee)
        }
      )
      const formData = new FormData()
      formData.append("file", this.file)
      formData.append("employee", JSON.stringify(this.employee))
      if (this.id == 0) {
      this.userService.addEmployee(formData).subscribe(
        (data) => {

        },
        (error) => {
          alert(JSON.stringify(error))
        }
      )
      } else {
        this.userService.updateEmployee(formData).subscribe(
          (data) => {
          },
          (error) => {
            alert(JSON.stringify(error))
          }
        )
      }
      this.route.navigateByUrl("/dashboard")
    }
    // console.log(document.getElementById("email").innerHTML)
    // const data = {
    //   id: this.id,
    //   name: this.user.name,
    //   email: this.user.email,
    //   jobTitle: this.user.jobTitle,
    //   imageUrl: this.user.image
    // }

    // this.userService.addEmployee(data).subscribe(
    //   (data) => {
    //
    //   },
    //   (error) => {
    //     console.log(error)
    //   }
    // )
  }

  change(event: any) {
    this.file = event.target.files[0]
    let Reader = new FileReader()
    let image: any = (document.getElementById("image2") as HTMLImageElement)
    Reader.onload = function (e) {
      image.src=e.target!!.result
    }
    Reader.readAsDataURL(this.file)
  }
}
