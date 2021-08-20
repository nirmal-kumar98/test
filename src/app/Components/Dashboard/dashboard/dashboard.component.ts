import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('rightSideBar') rightSideBar;
  mode = 'over';
  openComponent = 0;
  open = false;
  openSidbar = false;
  message: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openList(data): void {
    // console.log(data);
    // if (this.mode === 'side') {
    //   this.rightSideBar.close();
    // } else {
      if (this.open) {
        this.open = !this.open;
      }
      this.mode = 'side';
      this.open = !this.open;
      this.openComponent = 2;
      this.message = data;
      this.openSidbar = true;
      this.rightSideBar.open();
    // }
  }

  openRight(): void {
    this.open = true;
    // console.log('Right Navbar opened');
    this.mode = 'over';
    this.rightSideBar.open();
    this.openComponent = 1;
  }

  onClose(): void {
    // console.log('navbar closed');
    this.open = false;
    this.openSidbar = false;
  }

  closeComments(data): void {
    // console.log(data);
    if (data === 1) {
      this.rightSideBar.close();
      this.openSidbar = false;
    //   this.router.navigateByUrl('/msg', { skipLocationChange: true }).then(() => {
    //     this.router.navigate(['']);
    // });
    }
  }


  closeAnnoucement(data): void {
    // console.log(data);
    if (data === 2){
      this.rightSideBar.close();
    }
  }
}
