import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AddMunicipaliteComponent } from './pages/add-municipalite/add-municipalite.component';
import { UpdateMunicipaliteComponent } from './pages/update-municipalite/update-municipalite.component';
import { AddChienComponent } from './pages/add-chien/add-chien.component';

import { UpdateChienComponent } from './pages/update-chien/update-chien.component';

import { DetailChienComponent } from './pages/detail-chien/detail-chien.component';
import { DashboardVeterinaireComponent } from './pages/dashboard-veterinaire/dashboard-veterinaire.component';
import { UpdateEtatComponent } from './pages/update-etat/update-etat.component';
import { DetChienVeterComponent } from './pages/det-chien-veter/det-chien-veter.component';
import {LoginComponent} from './pages/login/login.component';
import {GuardGuard} from './guards/guard.guard';
import {ListUserComponent} from './pages/list-user/list-user.component';
import {DetailsUserComponent} from './pages/details-user/details-user.component';
import {UserFormComponent} from './pages/user-form/user-form.component';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
const routes: Routes =[
  {path: "update-employee/:id", component: UserFormComponent, canActivate: [GuardGuard]},
  {path: "users", component: ListUserComponent, canActivate: [GuardGuard]},
  {path: "addUser", component: UserFormComponent, canActivate: [GuardGuard]},
  {path: "detail-employee/:id", component: DetailsUserComponent, canActivate: [GuardGuard]},
  {path: "user-profile", component: UserProfileComponent, canActivate: [GuardGuard]},
  {path: "add-municipalite", component : AddMunicipaliteComponent,
  loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
    canActivate: [GuardGuard]
},

{path: "dashboard-veterinaire", component : DashboardVeterinaireComponent,
  loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
  canActivate: [GuardGuard]
},

{path: "add-chien", component : AddChienComponent,
  loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
  canActivate: [GuardGuard]
}
,
{path: "update-municipalite/:id", component : UpdateMunicipaliteComponent,
loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
  canActivate: [GuardGuard]
},

{path: "update-etat/:id", component : UpdateEtatComponent,
loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
  canActivate: [GuardGuard]
},

{path: "update-chien/:id", component : UpdateChienComponent,
  loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
  canActivate: [GuardGuard]
},
{path: "detail-chien/:id", component :DetailChienComponent ,
loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
  canActivate: [GuardGuard]

},
{path: "detail-chien-vet/:id", component :DetChienVeterComponent ,
loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule),
  canActivate: [GuardGuard]

},
  {path: "login", component: LoginComponent, loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule), },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }, {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: false
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
