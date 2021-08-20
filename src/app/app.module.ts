import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Reactive Forms
import { ReactiveFormsModule } from '@angular/forms';

// HTTP Modules
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Angular Material
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbInputModule, NbButtonModule, NbDatepickerModule,
        NbCardModule, NbUserModule, NbIconModule, NbListModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';


// Components
import { LoginComponent } from './Components/Auth/login/login.component';
import { SetUpApplicationComponent } from './Components/Auth/Register/set-up-application/set-up-application.component';
import { PersonalPasswordComponent } from './Components/Auth/Register/personal-password/personal-password.component';
import { RegisterComponent } from './Components/Auth/Register/register/register.component';
import { ConfirmationComponent } from './Components/Auth/Confirmation/confirmation/confirmation.component';
import { ConfirmationEmailComponent } from './Components/Auth/Confirmation/confirmation-email/confirmation-email.component';
import { VerificationCodeComponent } from './Components/Auth/Confirmation/verification-code/verification-code.component';
import { NotFountComponent } from './Components/Not Found/not-fount/not-fount.component';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { LeftSidenavComponent } from './Components/Dashboard/left-sidenav/left-sidenav.component';
import { RightSidenavComponent } from './Components/Dashboard/right-sidenav/right-sidenav.component';
import { AnnouncementFormComponent } from './Components/Dashboard/announcement-form/announcement-form.component';
import { CommentsComponent } from './Components/Dashboard/comments/comments.component';
import { MessageListComponent } from './Components/Dashboard/message-list/message-list.component';
import { AuthInterceptor } from './Services/auth-interceptor';
import { ResetPasswordComponent } from './Components/Auth/ForgorPassword/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Components/Auth/ForgorPassword/forgot-password/forgot-password.component';
import { ResetMailIdComponent } from './Components/Auth/ForgorPassword/reset-mail-id/reset-mail-id.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SetUpApplicationComponent,
    PersonalPasswordComponent,
    RegisterComponent,
    ConfirmationComponent,
    ConfirmationEmailComponent,
    VerificationCodeComponent,
    NotFountComponent,
    DashboardComponent,
    LeftSidenavComponent,
    RightSidenavComponent,
    AnnouncementFormComponent,
    CommentsComponent,
    MessageListComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    ResetMailIdComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbInputModule,
    NbButtonModule,
    NbEvaIconsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    NbCardModule,
    MatCheckboxModule,
    NbUserModule,
    NbIconModule,
    NbListModule,
    NbDatepickerModule.forRoot(),
    NbToastrModule.forRoot(),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
