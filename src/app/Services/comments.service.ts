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
export class CommentsService {

  constructor(
    private http: HttpClient,
    private toastrService: NbToastrService
  ) { }

  postComments(data): void {
    this.http.post(`${environment.backendURL}/api/comments`, data).subscribe((response) => {
      // console.log(response);
      this.showMessage('success', 'Comments Posted Successfully');
    });
  }

  updateComments(data): void {
    this.http.post(`${environment.backendURL}/api/comments/update`, data).subscribe((response) => {
      // console.log(response);
      this.showMessage('success', 'Comments Updated Successfully');
    });
  }

  showMessage(status: NbComponentStatus, message: string): void {
    this.toastrService.show(status, message, { status });
  }
}
