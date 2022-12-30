import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any
  file: File
  userProfile: FormGroup;
  constructor(private userService: UserService, private route: Router) { }

  ngOnInit() {
    this.getUser()
    this.userProfile = new FormGroup(
      {
        name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
        email: new FormControl("", [Validators.required, Validators.email]),
        image: new FormControl(null),
        password: new FormControl("")
      }
    )
  }
  getUser() {
    this.userService.getUser().subscribe(
      (data) => {
        this.user = data
        console.log(this.user)
      }
    )
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


  submit() {
    console.log(this.userProfile)
    if (this.userProfile.invalid) {
      this.userProfile.markAllAsTouched()
    } else {
      const formData = new FormData()
      formData.append("file", this.file)
      this.user.password = this.userProfile.get('password').value
      formData.append('employee', JSON.stringify(this.user))
      this.userService.updateProfile(formData).subscribe()
      this.route.navigateByUrl("/user-profile");
    }
  }
}
