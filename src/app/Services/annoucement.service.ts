import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NbToastrService, NbComponentStatus } from '@nebular/theme';

// Router
import { Router } from '@angular/router';

// Environment
import { environment } from '../../environments/environment.prod';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnoucementService {

  private users = new Subject<any>();
  private comments = new Subject<any>();

  constructor(
    private http: HttpClient,
    private toastrService: NbToastrService
  ) { }

  getUsers(): void {
    this.http.get<{message: string, result: any}>(`${environment.backendURL}/api/users`).subscribe((response) => {
      // console.log(response);
      this.users.next(response.result);
    });
  }

  getUpdatedUsers(): any {
    return this.users.asObservable();
  }

  createAnnouncement(data): void {
    this.http.post(`${environment.backendURL}/api/announcement`, data).subscribe((response) => {
      // console.log(response);
      this.showMessage('success', 'Announcement Created Successfully');
    });
  }

  getAnnouncement(): void {
    this.http.get<{ message: string, result: any}>(`${environment.backendURL}/api/announcement`).subscribe((response) => {
      console.log(response);
      this.comments.next(response.result);
    });
  }

  getUpdatedAnnouncement(): any {
    return this.comments.asObservable();
  }

  showMessage(status: NbComponentStatus, message: string): void {
    this.toastrService.show(status, message, { status });
  }
}
