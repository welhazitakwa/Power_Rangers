import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  loginForm: FormGroup
  error: String = ''
  constructor(private authService: AuthenticationService, private route: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required]),
        code: new FormControl(null, [Validators.required])
      }
    )
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.updatePassword({"email": this.loginForm.get("email").value, "code": this.loginForm.get("code").value , "password": this.loginForm.get("password").value}).subscribe(
        (data) => {
          this.route.navigateByUrl("/login")
        },
        (error) => {
          this.error = error.error.msg
        }
      )
    }
  }

}
