import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonIcon, IonList, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, ToastController, IonToggle } from '@ionic/angular';
import { addIcons } from 'ionicons'; // 2. Import addIcons utility
import { heart } from 'ionicons/icons'; // 3. Import specific 
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { ApiWordpress } from '../services/api-wordpress';
import { Authentication } from '../services/authentication';
import { lastValueFrom, take } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Preferences } from '@capacitor/preferences';
import { KeyName } from '../services/key-name';
import { Theme } from '../services/theme';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonToggle, IonButton, IonInput, IonIcon, IonList, TranslatePipe, IonCard, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, DatePipe]
})
export class Tab2Page {
  user = this.apiwp.getCurrentUser();
  posts: any[] = [];

  readonly paletteToggle = this.theme.paletteToggle();

  constructor(
    private apiwp: ApiWordpress,
    private auth: Authentication,
    private cdr: ChangeDetectorRef,
    private toastCtrl: ToastController,
    private translate: TranslateService,
    private key: KeyName,
    private theme: Theme
  ) {
    addIcons({ heart });
    this.user.subscribe(user => {
      console.log('user', user);

      if (user) {
        this.loadPosts();
      } else {
        this.posts = [];
        console.log('ko');

      }
    });
  }

  async loadPosts() {

    let res = await lastValueFrom(this.apiwp.getPosts().pipe(take(10))).catch(err => err);
    console.log('load post', res);
    if (res && res.length) {
      this.posts = res;
      this.cdr.markForCheck();
    } else {
      let msg = (!(res?.error?.message || '').includes('wordpress') ? (res?.error?.message || '') : '').replace(/<[^>]*>/g, '') || 'Lôĩ';//await lastValueFrom(this.translate.get('GLOBAL.ERROR'));
      const toast = await this.toastCtrl.create({
        message: msg,
        mode: 'ios',
        position: 'top',
        duration: 3000,
        icon: 'close-circle',
        color: 'danger',
        swipeGesture: 'vertical'
      });
      toast.present();
    }


    // this.apiwp.getPosts().subscribe(res => {
    //   this.posts = res;
    //   console.log('load post',res);
    //   this.cdr.markForCheck();

    // });
  }

}
