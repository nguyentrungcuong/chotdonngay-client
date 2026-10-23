import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonIcon, IonList } from '@ionic/angular';
import { addIcons } from 'ionicons'; // 2. Import addIcons utility
import { heart } from 'ionicons/icons'; // 3. Import specific 

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem,IonInput,IonIcon, IonList]
})
export class Tab2Page {

  constructor() {
    addIcons({ heart });
    
  }

}
