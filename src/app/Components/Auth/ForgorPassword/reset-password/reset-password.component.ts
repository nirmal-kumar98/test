import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


// Services
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]);
  valid = false;
  accessToken: string;
  constructor(
    private route: ActivatedRoute,
    private authServices: AuthService
  ) { }

  ngOnInit(): void {
    // console.log(this.route.snapshot.paramMap.get('id'));
    this.accessToken = this.route.snapshot.paramMap.get('id');
    // console.log(this.accessToken);
  }

  onChangePassword(password): void {
    // console.log(password);
    // console.log(this.password.value);
    if (this.password.valid) {
      // console.log('valid');
      this.valid = true;
    }
  }

  resetPassword(): void {
    const data = {
      accessToken: this.accessToken,
      password: this.password.value
    };
    // console.log(data);
    this.authServices.changePassword(data);
  }
}
