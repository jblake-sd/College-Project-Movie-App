import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonButton } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { home, star } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [ IonIcon, NgIf, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonButton]
})
export class MovieDetailsPage implements OnInit {

movie: any;

cast: any[] = [];

crew: any[] = [];

person: any;

favourites: any[] = [];

home = home;

star = star;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Movie ID:', id)
    const apiKey = '16116c99d8cfec890d546c27498eadb6';
    this.http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`).subscribe((data: any) => {console.log('Movie details:', data); 
      this.movie = data;})
    this.http.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`).subscribe((data: any) => {console.log('Cast details:', data);
      this.cast = data.cast;})
    this.http.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`).subscribe((data: any) => {console.log('Crew details:', data);
      this.crew = data.crew;})
    this.http.get(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`).subscribe((data: any) => {this.person = data;
        });
    const stored = localStorage.getItem('favourites');
    if (stored) { 
      this.favourites = JSON.parse(stored);
    }
  }
  
  openPersonDetails(personId: number) {
    this.router.navigate(['/person-details', personId]);
  }

  openHome() {
    this.router.navigate(['/home']);
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

  }
