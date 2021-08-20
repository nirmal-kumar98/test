import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';

// Services
import { AnnoucementService } from '../../../Services/annoucement.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit, OnChanges {

  @Output() sendToParents: EventEmitter<any> = new EventEmitter();
  @Input() sideBarState: boolean;
  annoucements: any;
  sideView = false;
  open = true;
  currentUseId = localStorage.getItem('userId');
  constructor(
    private announcementService: AnnoucementService
  ) { }

  ngOnInit(): void {
    // console.log('sideView', this.sideBarState);
    this.announcementService.getAnnouncement();
    this.announcementService.getUpdatedAnnouncement().subscribe((response) => {
      this.annoucements = response;
      // console.log(response);
      this.annoucements.forEach(x => x.color = this.getColors());
      // console.log(this.annoucements);
    });
  }

  ngOnChanges(): void {
    // console.log('second');
    // console.log(this.sideBarState);
    if (!this.sideBarState) {
      this.sideView = false;
    }
    // if (!this.sideView && this.open) {
    //   this.sideView = false;
    // }
  }

  OpenList(announcement): void {
    // console.log('first');
    // console.log(announcement);
    announcement.value = 1;
    // console.log(announcement);
    // this.sideView = !this.sideView && !this.sideBarState;
    this.sideView = true;
    this.sendToParents.emit(announcement);
  }


  getColors(): string {

      const letters = 'BCDEF'.split('');
      let color = '#';
      for (let i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * letters.length)];
      }
      return color;
  }

}
