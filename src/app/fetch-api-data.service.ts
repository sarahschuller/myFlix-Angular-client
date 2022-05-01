import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://flixfile.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  constructor(private http: HttpClient) {}

 /** This will make an api call to the user registration endpoint
       * @funtion userRegistration
       * @param userDetails
       * @returns the user object in a json format
       */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /** Make api call to the user login endpoint
     * @funtion userLogin
     * @param userDetails
     * @returns the user data in a json format
     */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /** This will make an API call in order to return all the movies
     * @funtion getAllMovies
     * @returns the full array of movies
     */
  
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

  /** This will make an API call in order to return one single movie
     * @funtion getSingleMovie
     * @returns one single movie
     */
  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   /** This will make an API call in order to return the director name
       * @funtion getDirector
       * @returns the director name
       */

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

   /** This will make an API call in order to return a movie genre
     * @funtion getGenre
     * @returns the genre of a movie
     */

  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genres/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/** API call to return the user profile
       * @funtion getUserProfile
       * @returns user's profile view
       */
  getUserProfile(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${username}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/** API call to edit the user profile
       * @funtion editUserProfile
       * @returns new update user data
       */
  editUserProfile(userCredentials: object): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${user}`, userCredentials, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

/** API call to delete the user profile
       * @funtion deleteUserProfile
       * @returns deletes user profile data
       */
  public deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


 /** This will get a list of the user's favorite movies
       * @funtion getFavoriteMovies
       * @returns the user favorite movies lists
       */
  getFavoriteMovies(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
        return this.http.get(apiUrl + `users/:username/movies/${movieId}`, {headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })}).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
          );
        }

 /** This will add a movie to the favorites
       * @funtion addFavoriteMovies
       * @returns the user favorite movies lists
       */
  public addFavoriteMovies(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    console.log(apiUrl + `users/${username}/movies/${movieId}`);
    return this.http.post(apiUrl + `users/${username}/movies/${movieId}`, {}, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
     * call api endpoint to delete a favorite movie from the users favorite list
     * @param movieId {any}
     * @returns updated user's information after removed a movie from the list in json format
     */

  deleteFavoriteMovies(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  private extractResponseData(data: any | Object): any {
    return data || {};
  }

  // Handle error function
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('some error occured:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something went wrong, please try again later!');
  }
}