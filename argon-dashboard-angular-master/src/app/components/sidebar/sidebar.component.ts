import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {GuardGuard} from '../../guards/guard.guard';


declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export let ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Municipalités',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/users', title: 'Users',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/dashboard-veterinaire', title: 'Etat Chien',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/tables', title: 'Chiens',  icon:'ni-bullet-list-67 text-red', class: '' },

  // {path:'/municipalite',title:'Municipalite' ,icon: 'ni-tv-2 text-primary', class: '' },
   // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
   // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
   // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },


   // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
   // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("Roles") == "[TECHNICIEN]") {
      ROUTES = ROUTES.splice(3)
    } else if (localStorage.getItem("Roles") == "[VETERINAIRE]") {
      ROUTES = ROUTES.splice(2, 1)
    } else if (localStorage.getItem("Roles") == "[MAIRE]") {
      ROUTES = ROUTES.slice(1, 3)
    } else if (localStorage.getItem("Roles") == "[ADMIN]") {
      ROUTES = ROUTES.splice(0, 2)
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
