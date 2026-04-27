import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [ NgIf, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent]
})
export class MovieDetailsPage implements OnInit {

movie: any;

cast: any[] = [];

crew: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  
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
    ;
  }

  }
