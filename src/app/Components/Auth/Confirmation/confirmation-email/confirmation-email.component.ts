import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Reactive Forms
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirmation-email',
  templateUrl: './confirmation-email.component.html',
  styleUrls: ['./confirmation-email.component.scss']
})
export class ConfirmationEmailComponent implements OnInit {

  @Output() sendToParent: EventEmitter<any> = new EventEmitter();

  emailId = new FormControl('', Validators.required);
  validate = false;

  constructor() { }

  ngOnInit(): void {
  }

  confirmEmail(): void {
    // console.log('Clicked');
    // console.log(this.emailId.value);
    this.sendToParent.emit({emailId: this.emailId.value});
  }

  onChangeEmail(text): void {
    this.validateEmail(text);
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
