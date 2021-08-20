import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Reactive Form
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-password',
  templateUrl: './personal-password.component.html',
  styleUrls: ['./personal-password.component.scss']
})
export class PersonalPasswordComponent implements OnInit {

  @Output() sendToParent: EventEmitter<any> = new EventEmitter();

  passwordForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('passwordForm')) {
      const dataFromLocalStorage = JSON.parse(localStorage.getItem('passwordForm'));
      this.passwordForm = new FormGroup({
        firstName: new FormControl(dataFromLocalStorage.firstName, Validators.required),
        lastName: new FormControl(dataFromLocalStorage.lastName, Validators.required),
        password: new FormControl(dataFromLocalStorage.password, Validators.required)
      });
    }
  }

  submit(): void {
    // console.log(this.passwordForm.value);
    localStorage.setItem('passwordForm', JSON.stringify(this.passwordForm.value));
    this.sendToParent.emit(this.passwordForm.value);
  }
}
