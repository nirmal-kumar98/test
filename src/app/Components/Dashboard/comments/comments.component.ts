import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Reactive
import { FormControl, Validators } from '@angular/forms';

// Services
import { CommentsService } from '../../../Services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() message: any;
  @Output() closes: EventEmitter<any> = new EventEmitter();
  comments = new FormControl('', Validators.required);
  currentUserId = localStorage.getItem('userId');
  updateForm = false;
  updatedComments: any;
  constructor(
    private commentsServices: CommentsService
  ) { }

  ngOnInit(): void {
    // console.log(this.message);
  }

  sendComments(): void {
    // console.log(this.comments.value);
    const data = {
      annoucement: this.message._id,
      message: this.comments.value,
      createdDate: new Date()
    };
    // console.log(data);
    this.message.comments.push({
      _id: 'sampleId',
      annoucement: this.message._id,
      createdDate: new Date(),
      message: this.comments.value,
    });
    this.commentsServices.postComments(data);
    this.comments.reset();
  }

  update(msg): void {
    // console.log(msg);
    this.updatedComments = msg;
    this.comments.patchValue(msg.message);
    this.updateForm = true;
  }

  updateComments(): void {
    // console.log(this.comments.value);
    const data = {
      id: this.updatedComments._id,
      message: this.comments.value
    };
    // console.log(data);
    this.updateForm = false;
    this.commentsServices.updateComments(data);
    const cmt = this.message.comments.find(x => x._id === this.updatedComments._id);
    cmt.message = this.comments.value;
    this.comments.reset();
  }

  close(): void {
    this.closes.emit(1);
  }
}
