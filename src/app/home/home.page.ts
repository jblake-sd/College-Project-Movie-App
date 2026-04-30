import { Component } from '@angular/core';
import { IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonSearchbar } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common'
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { home, star } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonIcon, NgIf, IonButton, DecimalPipe, IonHeader, IonToolbar, IonTitle, IonContent, NgFor, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonSearchbar],
})

export class HomePage {

  pageTitle: string = "Today's Trending Movies";

  movies: any[] = [];

  favourites: any[] = [];

  home = home;

  star = star;

  constructor(private http: HttpClient, private router: Router) {
    const apiKey = '16116c99d8cfec890d546c27498eadb6';
    this.http.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`).subscribe((data: any) => {this.movies = data.results; console.log(this.movies);
        })
  }

  ngOnInit() {
    const stored = localStorage.getItem('favourites');
    if (stored) { 
      this.favourites = JSON.parse(stored);
    };
    this.loadTrendingMovies();
  }

  onSearch(event: any) {
    const query = event.detail.value;

    if (!query || query.trim() === '') {
      this.loadTrendingMovies();
      return;
     }
    
    const apiKey = '16116c99d8cfec890d546c27498eadb6';
    this.http.get(`https://api.themoviedb.org/3/search/movie?&api_key=${apiKey}&query=${query}`).subscribe((data: any) => {this.movies = data.results;
      this.pageTitle = 'Search Results';
    });
  }

  loadTrendingMovies() {
    const apiKey = '16116c99d8cfec890d546c27498eadb6';
    this.http.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`).subscribe((data:any) => {this.movies = data.results;
      this.pageTitle = 'Trending Movies';
    });
  }

  clearSearch() {
    this.loadTrendingMovies();
  }

  openMovieDetails(movieId: number) {
    this.router.navigate(['/movie-details', movieId])
  }

  openFavourites() {
    this.router.navigate(['/favourites'])
  }

  isFavourite(movie: any) {
    return this.favourites.some(fav => fav.id === movie.id);
  }

  addToFavourites(movie: any) {
  if (!this.isFavourite(movie)) {
    this.favourites.push(movie);
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }}

  removeFromFavourites(movie: any) {
    this.favourites = this.favourites.filter(fav => fav.id !== movie.id);
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  openHome() {
    this.router.navigate(['/home']);
  }

}
