import { Component } from '@angular/core';
import { IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardTitle, IonCardHeader, IonCardContent } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common'
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonButton, RouterLink, DecimalPipe, IonHeader, IonToolbar, IonTitle, IonContent, NgFor, IonCard, IonCardTitle, IonCardHeader, IonCardContent],
})

export class HomePage {

  movies: any[] = [];

  constructor(private http: HttpClient, private router: Router) {
    const apiKey = '16116c99d8cfec890d546c27498eadb6';
    this.http.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`).subscribe((data: any) => {this.movies = data.results; console.log(this.movies);

    })
  }

}
