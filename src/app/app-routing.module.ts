import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/Register/register/register.component';
import { ConfirmationComponent } from './Components/Auth/Confirmation/confirmation/confirmation.component';
import { DashboardComponent } from './Components/Dashboard/dashboard/dashboard.component';
import { AuthGuard } from './Gaurd/auth.guard';
import { MessageListComponent } from './Components/Dashboard/message-list/message-list.component';
import { ResetPasswordComponent } from './Components/Auth/ForgorPassword/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Components/Auth/ForgorPassword/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'resetPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'resetPassword/:id',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
