import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular';
import { Authentication } from '../services/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonButton],
})
export class Tab3Page {
  constructor(private authService:Authentication, private router:Router) {}

  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/',{replaceUrl:true});
  }
}
