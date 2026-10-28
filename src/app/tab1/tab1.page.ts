import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, ToastController, IonMenu, IonItem, IonIcon, IonLabel, IonList, IonListHeader, IonMenuToggle, MenuController, IonButtons, IonBadge, IonMenuButton, IonAvatar, IonImg, IonNote, IonFooter, AlertController, ModalController } from '@ionic/angular';
import { Authentication } from '../services/authentication';
import { ApiWordpress } from '../services/api-wordpress';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { addIcons } from 'ionicons'; // 2. Import addIcons utility
import { heart, search, notifications, cogOutline, personCircleOutline, checkmarkCircle, logOutOutline } from 'ionicons/icons'; // 3. Import specific 
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { GeneralSettingsComponent } from '../components/general-settings/general-settings.component';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonItem, IonBadge, IonNote, AsyncPipe, IonFooter, IonMenuButton, IonIcon, IonAvatar, IonImg, IonButtons, TranslatePipe, IonLabel, IonMenuToggle, IonList, IonListHeader, IonContent, IonCard, IonMenu, IonCardHeader, IonButton, IonCardTitle, IonCardSubtitle, IonCardContent, ReactiveFormsModule, DatePipe],
})

export class Tab1Page {

  user = this.apiwp.getCurrentUser();


  constructor(
    private apiwp: ApiWordpress,
    private auth: Authentication,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController,
    private router: Router,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private modalCtrl:ModalController
  ) {
    addIcons({ search, notifications, cogOutline, personCircleOutline, checkmarkCircle, logOutOutline });

    
  }




  closeMenu() {
    this.menuCtrl.close('main-content');
  }

  async openSettingsGeneral() {
    const modal = await this.modalCtrl.create({
      mode:'ios',
      component: GeneralSettingsComponent,
    });
    modal.present();
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: await lastValueFrom(this.translate.get('AUTH.LOGOUT')) + '?',
      // subHeader: 'Subtitle',
      // message: prod.name,
      mode: 'ios',
      buttons: [
        {
          text: await lastValueFrom(this.translate.get('GENERAL.CANCEL')),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: await lastValueFrom(this.translate.get('GENERAL.OK')),
          handler: async () => {
            await this.auth.logout();
            this.router.navigateByUrl('/', { replaceUrl: true });
          }
        }
      ]
    });
    await alert.present();

  }
}

