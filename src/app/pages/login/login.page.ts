import { Component, Injectable, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonTitle, IonToolbar, LoadingController } from '@ionic/angular';
import { Authentication } from '../../services/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,IonItem,IonInput,IonButton,IonIcon, CommonModule, FormsModule,ReactiveFormsModule]
})

export class LoginPage implements OnInit {
 credentials:FormGroup=this.fb.group({});
  constructor(
    private fb:FormBuilder,
    private authService:Authentication,
    private alertCtrl:AlertController,
    private router:Router,
    private loadingCtrl:LoadingController
  ) { }

  ngOnInit() {
    this.credentials=this.fb.group({
      email:['eve.holt@reqres.in',[Validators.required,Validators.email]],
      password:['cityslicka',[Validators.required,Validators.minLength(6)]]
    })
  }

  async login(){
    const loading= await this.loadingCtrl.create();
    loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async(res)=>{
        await loading.dismiss();
        this.router.navigateByUrl('/tabs',{replaceUrl:true});
      },
      async(err)=>{
        await loading.dismiss();
        const alert= await this.alertCtrl.create({
          header:'Login failed',
          message:err.error.error,
          buttons:['OK']
        });

        await alert.present();
      }
    )







  }

  get email(){
    return this.credentials.get('email');
  }
  get password(){
    return this.credentials.get('password');
  }

}
