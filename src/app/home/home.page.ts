import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { NgFor } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, NgFor],
})

export class HomePage {

  movies: any[] = [];

  constructor(private http: HttpClient) {
    const apiKey = '16116c99d8cfec890d546c27498eadb6';
    this.http.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`).subscribe((data: any) => {this.movies = data.results; console.log(this.movies);

    })
  }

}
