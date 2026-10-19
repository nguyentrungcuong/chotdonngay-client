import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular';
import { Authentication } from '../services/authentication';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonButton],
})
export class Tab1Page {
  constructor(private authService:Authentication, private router:Router) {}

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/',{replaceUrl:true});
  }
}

