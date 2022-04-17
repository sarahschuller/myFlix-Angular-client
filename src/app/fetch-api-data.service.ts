import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://flixfile.herokuapp.com/';
export interface User {
  _id: string;
  Favorites: Array<string>;
  Username: string;
  Email: string;
  Birthdate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {
  }

 // Making the api call for the user registration endpoint
 public userRegistration(userDetails: any): Observable<any> {
  console.log(userDetails);
  return this.http
    .post(apiUrl + 'users', userDetails)
    .pipe(catchError(this.handleError));
}

getAllMovies(): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http
    .get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
}

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}
