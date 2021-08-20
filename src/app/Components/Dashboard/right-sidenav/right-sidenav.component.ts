import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';




@Component({
  selector: 'app-right-sidenav',
  templateUrl: './right-sidenav.component.html',
  styleUrls: ['./right-sidenav.component.scss']
})
export class RightSidenavComponent implements OnInit {

  annocementForm = false;
  commentForm = false;
  @Input() openComponent: number;
  @Input() messageToComments: any;
  @Output() closeSidebar: EventEmitter<any> = new EventEmitter();
  @Output() closeSidebarFromAn: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // console.log(this.openComponent);
    if (this.openComponent === 1) {
      this.commentForm = false;
      this.annocementForm = true;
    } else {
      this.annocementForm = false;
      this.commentForm = true;
    }
  }

  close(): void {
    this.closeSidebar.emit(1);
  }

  closeSidebars(data): void {
    // console.log(data);
    this.closeSidebarFromAn.emit(2);
  }
}
