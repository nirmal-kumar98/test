import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Reactive Form
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Router
import { Router } from '@angular/router';

// Services
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss']
})
export class VerificationCodeComponent implements OnInit {

  @Output() sendToParent: EventEmitter<any> = new EventEmitter();

  validation = false;
  first = false;
  errMessage = '';
  otpNumber = '';
  otpForm = new FormGroup({
    box1: new FormControl('', Validators.required),
    box2: new FormControl('', Validators.required),
    box3: new FormControl('', Validators.required),
    box4: new FormControl('', Validators.required),
    box5: new FormControl('', Validators.required),
    box6: new FormControl('', Validators.required),
  });
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  boxOnChange(value, id): void {

    if (value.length === 1) {
      this.otpNumber = this.otpNumber + value;
      // console.log(this.otpNumber);
      document.getElementById(id).focus();
    }

    if (this.otpForm.valid) {
      // console.log(this.otpForm.value);
      // console.log(this.otpNumber);
      this.sendToParent.emit(this.otpNumber);
      this.authService.confirmOTP(this.otpNumber);
      this.authService.getOTPVerification().subscribe((response) => {
        // console.log(response);
        if (response) {
          this.router.navigate(['/login']);
          localStorage.clear();
        } else {
          this.first = true;
          this.validation = true;
          this.errMessage = 'Please enter the valid verification code.';
          this.otpNumber = '';
          this.otpForm.reset();
        }
      });
    }

  }

}
