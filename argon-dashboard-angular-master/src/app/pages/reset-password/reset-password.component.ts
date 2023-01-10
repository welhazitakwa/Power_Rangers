import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  loginForm: FormGroup
  error: String = ''
  constructor(private authService: AuthenticationService, private route: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
      }
    )
  }

  onSubmit() {
    console.log(this.loginForm)
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    } else {
      this.authService.reset(this.loginForm.get("email").value).subscribe(
        (data) => {
          this.route.navigateByUrl("/reset-password")
        },
        (error) => {
          this.error = error.error.msg
        }
      )
    }
  }

}
