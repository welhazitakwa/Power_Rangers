import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {SocialAuthService} from 'angularx-social-login';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {

  loginForm: FormGroup
  error: String = ''
  constructor(private authService: AuthenticationService, private route: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required])
      }
    )
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.verify({"email": this.loginForm.get("email").value, "verify_code": this.loginForm.get("password").value}).subscribe(
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
