import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AddMunicipaliteComponent } from './pages/add-municipalite/add-municipalite.component';
import { UpdateMunicipaliteComponent } from './pages/update-municipalite/update-municipalite.component';
import { AddChienComponent } from './pages/add-chien/add-chien.component';
import { DetailChienComponent } from './pages/detail-chien/detail-chien.component';
import { UpdateChienComponent } from './pages/update-chien/update-chien.component';
import { DashboardVeterinaireComponent } from './pages/dashboard-veterinaire/dashboard-veterinaire.component';
import { UpdateEtatComponent } from './pages/update-etat/update-etat.component';
import { DetChienVeterComponent } from './pages/det-chien-veter/det-chien-veter.component';
import {JwtInterceptor} from './interceptors/jwt-interceptor';
import {
  GoogleLoginProvider,
  FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig
} from 'angularx-social-login';
import { VerifyAccountComponent } from './pages/verify-account/verify-account.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SocialLoginModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AddMunicipaliteComponent,
    UpdateMunicipaliteComponent,
    AddChienComponent,
    DetailChienComponent,
    UpdateChienComponent,
    DashboardVeterinaireComponent,
    UpdateEtatComponent,
    DetChienVeterComponent,
    VerifyAccountComponent,
    ResetPasswordComponent,
    UpdatePasswordComponent,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '735981164925-arf5lgjejdukdnsfp6s8mb8jvdklipar.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
