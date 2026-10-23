import { ChangeDetectorRef, Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, ToastController } from '@ionic/angular';
import { Authentication } from '../services/authentication';
import { ApiWordpress } from '../services/api-wordpress';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { lastValueFrom, take } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonButton, IonCardTitle, IonCardSubtitle, IonCardContent, ReactiveFormsModule, DatePipe],
})

export class Tab1Page {
  user = this.apiwp.getCurrentUser();
  posts: any[] = [];


  constructor(
    private apiwp: ApiWordpress,
    private auth: Authentication,
    private cdr: ChangeDetectorRef,
    private toastCtrl:ToastController
  ) {
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
    }else{
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

  // loadPrivatePosts() {
  //   this.api.getPrivatePosts().subscribe(res => {
  //     this.posts = res;
  //   });
  // }
}

