import { Component, OnInit } from '@angular/core';

// Router
import { Router } from '@angular/router';

// Reactive Form
import { FormGroup, FormControl, Validators } from '@angular/forms';


// Services
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
   emailId: new FormControl('', Validators.required),
   password: new FormControl('', Validators.required)
  });
  constructor(
    private authServices: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    // console.log(this.loginForm.value);
    this.authServices.login(this.loginForm.value);
  }

  register(): void {
    this.router.navigate(['/register']);
  }

  forgot(): void {
    this.router.navigate(['/resetPassword']);
  }
}
