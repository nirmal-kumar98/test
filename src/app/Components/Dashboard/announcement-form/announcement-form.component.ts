import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

// Reactive Form
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { AnnoucementService } from '../../../Services/annoucement.service';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Fruit {
  name: string;
}

export interface User {
 userId: string;
 emailId: string;
}

@Component({
  selector: 'app-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.scss']
})
export class AnnouncementFormComponent implements OnInit {

  @Output() closeSidebar: EventEmitter<any> = new EventEmitter();
  currentUserId = localStorage.getItem('userId');
  annocementBtn = false;
  eventBtn = false;
  reminderBtn = false;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  // fruits: Fruit[] = [
  //   {name: 'Lemon'},
  //   {name: 'Lime'},
  //   {name: 'Apple'},
  // ];
  users: User[] = [];
  users3 = [];
  users2: any;

  myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
  filteredOptions: Observable<any>;

  annoucementForm = new FormGroup({
    subject: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    expiryDateForReminder: new FormControl('', Validators.required),
    dateForEvent: new FormControl('', Validators.required),
    timeForEvent: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  @ViewChild('matOptionValue') matOptionValue;
  constructor(
    private annoucementService: AnnoucementService
  ) { }

  ngOnInit(): void {
    this.annoucementService.getUsers();
    this.annoucementService.getUpdatedUsers().subscribe((users) => {
      this.users2 = users;
      // console.log(this.currentUserId);
      // console.log(this.users2);
      this.users2.filter(user => {
        if (user._id !== this.currentUserId) {
          this.users3.push(`${user.emailId}`);
        }
      });
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });
  }

  ButtonColorChange(button): void {
    this.annoucementForm.patchValue({
      category: button
    });
    if (button === 'announcement') {
      this.annocementBtn = true;
      this.eventBtn = false;
      this.reminderBtn = false;
      this.annoucementForm.patchValue({
        dateForEvent: '',
        timeForEvent: '',
        location: '',
        expiryDateForReminder: ''
      });
    } else if (button === 'event') {
      this.annocementBtn = false;
      this.eventBtn = true;
      this.reminderBtn = false;
      this.annoucementForm.patchValue({
        expiryDateForReminder: ''
      });
    } else {
      this.annocementBtn = false;
      this.eventBtn = false;
      this.reminderBtn = true;
      this.annoucementForm.patchValue({
        dateForEvent: '',
        timeForEvent: '',
        location: '',
      });
    }
  }

  add(event: any): void {
    // console.log(this.matOptionValue.value);
    // this.matOptionValue.textContent = '';
    // document.getElementById('matOption').innerHTML = 'null';
    // console.log('Button clicked');
    // console.log(event);
    const value = event;
    if (value) {
      const usr = this.users2.find(x => x.emailId === value);
      this.users.push({emailId: usr.emailId, userId: usr._id});
    }
  }

  add2(event: any): void {
    // console.log('enter clicked');
    const value = (event.value || '').trim();
    if (value) {
      const index = this.users.indexOf(value);
      // console.log(index);
      if (index >= 0) {
        const usr = this.users2.find(x => x.emailId === value);
        this.users.push({emailId: value, userId: usr._id});
      }
    }
  }

  remove(user: User): void {
    // console.log(user);
    const index = this.users.indexOf(user);
    if (index >= 0) {
      this.users.splice(index, 1);
    }
  }

  private _filter(value: string): string[] {
    // console.log(value);
    const filterValue = value.toLowerCase();
    // console.log(this.users3);
    return this.users3.filter(option => option.toLowerCase().includes(filterValue));
  }

  submit(): void {
    // console.log(this.users);
    // console.log(this.annoucementForm.value);
    const data = {
      subject: this.annoucementForm.value.subject,
      category: this.annoucementForm.value.category,
      descriptions: this.annoucementForm.value.description,
      notifyPeople: this.users,
      createdDate: new Date(),
      expiryDateForReminder: this.annoucementForm.value.expiryDateForReminder,
      dateForEvent: this.annoucementForm.value.dateForEvent,
      timeForEvent: this.annoucementForm.value.timeForEvent,
      location: this.annoucementForm.value.location
    };
    // console.log(data);
    this.annoucementService.createAnnouncement(data);
    this.annoucementForm.reset();
    this.users = [];
    this.closeSidebar.emit(1);
    // this.matOptionValue.value
  }

}
