import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

// Services
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-reset-mail-id',
  templateUrl: './reset-mail-id.component.html',
  styleUrls: ['./reset-mail-id.component.scss']
})
export class ResetMailIdComponent implements OnInit {

  emailId = new FormControl('', Validators.required);
  validate = false;

  constructor(
    private authServices: AuthService
  ) { }

  ngOnInit(): void {
  }

  onChangeEmail(value): void {
    this.validateEmail(value);
  }

  confirmEmail(): void {
    // console.log(this.emailId.value);
    const data = {
      email: this.emailId.value
    };
    this.authServices.forgotPassword(data);
  }

  validateEmail(email): void {
    const re = /\S+@\S+\.\S+/;
    // console.log(re.test(email));
    if (re.test(email)) {
      this.validate = true;
    } else {
      this.validate = false;
    }
  }
}
