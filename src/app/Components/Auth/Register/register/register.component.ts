import { Component, OnInit } from '@angular/core';

// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = true;
  passwordForm = false;
  registerFormData: any;
  passwordFormData: any;
  registerData: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getRegisterFormData(data): void {
    // console.log(data);
    this.registerData = data;
    this.registerForm = false;
    this.passwordForm = true;
  }

  getPasswordFormData(data): void {
    // console.log(data);
    this.registerData = {
      ...this.registerData,
      ...data
    };
    // console.log(this.registerData);
    localStorage.setItem('registerData', JSON.stringify(this.registerData));
    this.router.navigate(['/confirmation']);
  }

}
