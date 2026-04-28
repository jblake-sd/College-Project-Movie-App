import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common'


@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
  standalone: true,
  imports: [ NgFor, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PersonDetailsPage implements OnInit {

person: any;

combinedCredits: any[] = [];

constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const apiKey = '16116c99d8cfec890d546c27498eadb6';
    this.http.get(`https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`)
    .subscribe((data: any) => {this.person = data;
    })
    this.http.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}`)
    .subscribe((data: any) => 
      {console.log('Combined credits data:', data);
        this.combinedCredits = data.cast;
        console.log('Stored combined credits:', this.combinedCredits);
    });

  }

}
