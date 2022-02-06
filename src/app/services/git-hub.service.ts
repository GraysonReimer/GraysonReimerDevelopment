import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {
  private url = "https://api.github.com/users/GraysonReimer/repos";

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(this.url).pipe(catchError(this.handleError));
  }

  handleError(error: Response) {
    return throwError(() => { 
      return error.status;
    }); 
  }
}
