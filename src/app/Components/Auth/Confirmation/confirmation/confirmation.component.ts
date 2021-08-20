import { Component, OnInit } from '@angular/core';


// Services
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  emailForm = true;
  otpForm = false;
  registerData: any;
  validation = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('registerData')) {
      this.registerData = JSON.parse(localStorage.getItem('registerData'));
      this.validation = true;
    } else {
      this.validation = false;
    }
  }

  getEmailID(data): void {
    // console.log(data);
    this.registerData.emailId = data.emailId;
    // console.log(this.registerData);
    this.emailForm = false;
    this.authService.register(this.registerData);
    this.authService.getRegisterVerification().subscribe((response) => {
      // console.log(response);
      this.otpForm = response;
    });
    // this.otpForm = true;
  }

  getOTP(data): void {
    // console.log(data);
    // console.log(this.registerData);
    // this.authService.confirmOTP()
  }
}
