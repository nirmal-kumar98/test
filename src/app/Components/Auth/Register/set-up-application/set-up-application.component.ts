import { Component, OnInit, Output, EventEmitter } from '@angular/core';

// Reactive Forms
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-up-application',
  templateUrl: './set-up-application.component.html',
  styleUrls: ['./set-up-application.component.scss']
})
export class SetUpApplicationComponent implements OnInit {

  @Output() sendToParent: EventEmitter<any> = new EventEmitter();

  registerForm = new FormGroup({
    companyName: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    noOfEmployees: new FormControl('', Validators.required),
    domainName: new FormControl('', Validators.required),
    companyId: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('registerForm')) {
      const dataFromLocalStorage = JSON.parse(localStorage.getItem('registerForm'));
      // console.log('From Local Storage', JSON.parse(localStorage.getItem('registerForm')));
      this.registerForm = new FormGroup({
        companyName: new FormControl(dataFromLocalStorage.companyName, Validators.required),
        location: new FormControl(dataFromLocalStorage.location, Validators.required),
        noOfEmployees: new FormControl(dataFromLocalStorage.noOfEmployees, Validators.required),
        domainName: new FormControl(dataFromLocalStorage.domainName, Validators.required),
      });
    }
  }

  companyNameChange(text): void {
    this.registerForm.patchValue({
      companyId: text
    });
  }

  submit(): void {
    // console.log(this.registerForm.value);
    this.registerForm.patchValue({
      companyId: this.registerForm.value.companyName.split(' ').join('').toLowerCase()
    });
    localStorage.setItem('registerForm', JSON.stringify(this.registerForm.value));
    this.sendToParent.emit(this.registerForm.value);
  }

}
