import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private route: Router) {
  }
  canActivate() {
    if(!this.auth.isLogin()) {
      this.route.navigateByUrl("/login")
      return false;
    }
    return true;
  }

}
