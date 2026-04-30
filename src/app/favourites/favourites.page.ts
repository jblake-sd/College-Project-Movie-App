import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, IonCard } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';
import { home, star } from 'ionicons/icons';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [ IonIcon, NgFor, IonButton, IonCardHeader, IonCardContent, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard]
})

export class FavouritesPage implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router) { }

  favourites: any[] = [];

  home = home;

  star = star;

  ngOnInit() {
    const stored = localStorage.getItem('favourites');
    if (stored) { 
      this.favourites = JSON.parse(stored);
    }
  }

  openMovieDetails(movieId: number) {
    this.router.navigate(['/movie-details', movieId])
  }

  openHome() {
    this.router.navigate(['/home']);
  }

  openFavourites() {
    this.router.navigate(['/favourites'])
  }

  }

