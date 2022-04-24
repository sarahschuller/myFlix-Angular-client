// Angular Imports
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

// Component Imports
import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  user: any = {};
  Username = localStorage.getItem('user');
  movies: any[] = [];
  currentFavorites: any [] = [] ;

  constructor (
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog, 
    public snackBar: MatSnackBar, 
    public router: Router
    ) { }
  
ngOnInit(): void {
  this.getMovies();
}


//Get all movies
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  // Open Director Info View
  openDirectorCard(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: {Name: name, Bio: bio, Birth: birth},
      width: '500px',
    });
  }
  // Open Genre Info View
  openGenreCard(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  // Open Movie Description view
  openDescriptionCard(title: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px'
    });
  }

  getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUserProfile(username).subscribe((resp: any) => {
    });
  }

  addFavorite(id: string): void {
    this.fetchApiData.addFavoriteMovies(id).subscribe((response: any) => {
      console.log(response);
      this.ngOnInit();
    });
        }
    deleteFavorite(id: string): void {
        this.fetchApiData.deleteFavoriteMovies(id).subscribe((response: any) => {
        console.log(response);
      });
    }
}
