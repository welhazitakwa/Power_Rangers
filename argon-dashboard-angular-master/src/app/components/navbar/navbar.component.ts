import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {UserService} from '../../services/user.service';
import {Employee} from '../../common/employee';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  isLogin:Boolean = true
  public listTitles: any[];
  public location: Location;
  employee: Employee
  constructor(location: Location,  private element: ElementRef, private router: Router,
              private authentication: AuthenticationService,
              private userService: UserService) {
    this.location = location;
  }

  ngOnInit() {
    this.userService.getUser().subscribe(
      (data) => {
        this.employee = data
      },
      (error) => {

      }
    )
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  logout() {
    this.authentication.logout()
    this.router.navigateByUrl("/login")
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
    return'AddMunicipaliteComponent'
  }

}
