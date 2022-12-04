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

const routes: Routes =[

  {path: "add-municipalite", component : AddMunicipaliteComponent,
  loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
},

{path: "dashboard-veterinaire", component : DashboardVeterinaireComponent,
  loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
},

{path: "add-chien", component : AddChienComponent,
  loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
}
,
{path: "update-municipalite/:id", component : UpdateMunicipaliteComponent,
loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
},

{path: "update-etat/:id", component : UpdateEtatComponent,
loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
},

{path: "update-chien/:id", component : UpdateChienComponent,
  loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
},
{path: "detail-chien/:id", component :DetailChienComponent ,
loadChildren: () => import('src/app/layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)

},

  {
    path: '',
    redirectTo: 'dashboard',
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
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
