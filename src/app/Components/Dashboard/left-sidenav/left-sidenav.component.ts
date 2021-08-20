import { Component, OnInit } from '@angular/core';


// Services
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-left-sidenav',
  templateUrl: './left-sidenav.component.html',
  styleUrls: ['./left-sidenav.component.scss']
})
export class LeftSidenavComponent implements OnInit {

  constructor(
    private authServices: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authServices.logout();
  }
}
