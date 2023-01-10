import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup
  error: String = ''
  constructor(private authService: AuthenticationService, private route: Router, private authSocial: SocialAuthService) {}

  ngOnInit() {
    this.authService.logout()
    this.loginForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required])
      }
    )
  }
  ngOnDestroy() {
  }

  onSubmit() {
    console.log(this.loginForm.get("email").value)
    if (this.loginForm.status == "INVALID") {
      this.loginForm.markAllAsTouched()
    } else {
      this.authService.login({"email": this.loginForm.get("email").value, "password": this.loginForm.get("password").value}).subscribe(
        (data) => {
          if (data.headers.has("authorization")) {
            console.log("hani lannna " + data.headers.get("authorization"))
            localStorage.setItem("Token", data.headers.get("authorization")!);
            localStorage.setItem("Roles", data.headers.get("Roles")!)
            console.log('the value in localStorage' + localStorage.getItem("Token"))
            console.log('3malna login ? ' + localStorage.getItem("Token"))
            if (this.authService.isLogin()) {
              if (localStorage.getItem("Roles") == "[TECHNICIEN]") {
                this.route.navigateByUrl("/tables")
              } else if (localStorage.getItem("Roles") == "[ADMIN]") {
                  this.route.navigateByUrl("/dashboard")
              }
              else if (localStorage.getItem("Roles") == "[VETERINAIRE]")
                this.route.navigateByUrl("/dashboard-veterinaire")
              else if(localStorage.getItem("Roles") == "[MAIRE]") {
                this.route.navigateByUrl("/dashboard")
              } else {
                this.route.navigateByUrl("/login");
              }
            }
          }
        },
        (error) => {
          this.error = error.error.msg
        }
      )
    }
  }

  signInWithGoogle(): void {
    this.authSocial.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authSocial.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authSocial.signOut();
  }

}
