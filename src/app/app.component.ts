import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'work-space-management';
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  userIsAuthenticated2 = true;
  user: any;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    // console.log(this.userIsAuthenticated);
    this.authService.getAuthStateListener().subscribe(isAutheticated => {
      // console.log(isAutheticated);
      // console.log(this.userIsAuthenticated);
      this.userIsAuthenticated = isAutheticated;
      // console.log(this.userIsAuthenticated);
      // this.userIsAuthenticated = false;
      // tslint:disable-next-line: deprecation
      this.authService.getUser().subscribe(user => {
        // console.log(user);
        this.user = user;
      });
    });
  }

  ngOnDestroy(): void {
    // this.mediaSub.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }

  // tslint:disable-next-line: typedef
  isAuthenticated() {
    return this.userIsAuthenticated;
  }

  // openDashboard(): void {
  //   this.router.navigate(['']);
  // }
}
