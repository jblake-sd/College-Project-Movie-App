import { Component } from '@angular/core';
import { IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonSearchbar } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common'
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonButton, DecimalPipe, IonHeader, IonToolbar, IonTitle, IonContent, NgFor, IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonSearchbar],
})

export class HomePage {

  pageTitle: string = "Today's Trending Movies";

  movies: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    const apiKey = '16116c99d8cfec890d546c27498eadb6';
    this.http.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`).subscribe((data: any) => {this.movies = data.results; console.log(this.movies);
        })
  }

  onSearch(event: any) {
    const query = event.target.value;

    this.pageTitle = "Search Results";
    
    const apiKey = '16116c99d8cfec890d546c27498eadb6';
    this.http.get(`https://api.themoviedb.org/3/search/movie?&api_key=${apiKey}&query=${query}`).subscribe((data: any) => {this.movies = data.results;
    })
  }

  openMovieDetails(movieId: number) {
    this.router.navigate(['/movie-details', movieId])
  }

}
