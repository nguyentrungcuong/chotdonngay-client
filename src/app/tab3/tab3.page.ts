import { Component, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonListHeader, IonList, IonItem, IonToggle, IonRange, IonIcon, IonLabel, IonText } from '@ionic/angular';
import { Authentication } from '../services/authentication';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { personCircle, personCircleOutline, sunny, sunnyOutline } from 'ionicons/icons';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle,IonHeader,IonListHeader,IonList,IonItem,IonToggle,IonRange,IonIcon,IonLabel,IonText ,IonContent,IonButton],
})
export class Tab3Page {

  constructor(private authService:Authentication, private router:Router) {
    addIcons({ personCircle, personCircleOutline, sunny, sunnyOutline });
  }


}
