import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common'
import { IonIcon } from '@ionic/angular/standalone';
import { home, star } from 'ionicons/icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
  standalone: true,
  imports: [IonIcon, NgIf, IonButton, NgFor, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton]
})
export class PersonDetailsPage implements OnInit {

person: any;

combinedCredits: any[] = [];

favourites: any[] = [];

home = home;

star = star;

constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const apiKey = '16116c99d8cfec890d546c27498eadb6';
    this.http.get(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`)
    .subscribe((data: any) => {this.person = data;
    })
    this.http.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}`)
    .subscribe((data: any) => 
      {this.combinedCredits = data.cast;
        this.combinedCredits;
    });
    const stored = localStorage.getItem('favourites');
    if (stored) {
      this.favourites = JSON.parse(stored);
    }

  }

  isFavourite(credit: any) {
    return this.favourites.some(fav => fav.id === credit.id);
  }

  addToFavourites(credit: any) {
  if (!this.isFavourite(credit)) {
    this.favourites.push(credit);
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }}

  removeFromFavourites(credit: any) {
    this.favourites = this.favourites.filter(fav => fav.id !== credit.id);
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  openHome() {
    this.router.navigate(['/home']);
  }

  openFavourites() {
    this.router.navigate(['/favourites'])
  }
}
