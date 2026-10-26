import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonTitle, IonToolbar, LoadingController, IonList, IonPopover, IonText } from '@ionic/angular';
import { Authentication } from '../../services/authentication';
import { Router } from '@angular/router';
import { ApiWordpress } from '../../services/api-wordpress';
import { addIcons } from 'ionicons'; // 2. Import addIcons utility
import { server, personCircle, key, chevronDown, close, closeCircle } from 'ionicons/icons'; // 3. Import specific 
import { KeyName } from '../../services/key-name';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonPopover, IonList, IonText, IonInput, IonButton, IonIcon, CommonModule, FormsModule, ReactiveFormsModule]
})

export class LoginPage implements OnInit {
  credentials: FormGroup = this.fb.group({});

  user = this.apiwp.getCurrentUser();

  serverNames: string[] = ['http://localhost'];
  originhost: string = '';

  constructor(
    private fb: FormBuilder,
    private apiwp: ApiWordpress,
    private router: Router,
    private auth: Authentication,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private keyName: KeyName
  ) {
    addIcons({ server, personCircle, key, chevronDown, close, closeCircle });
  }

  ngOnInit() {

    console.log('loginnnnnn');

    // auto add servername
    this.originhost = location.origin;
    if (this.originhost && !this.serverNames.some(f => f === this.originhost)) {
      this.serverNames.unshift(this.originhost);
    }

    console.log('add ser');


    this.credentials = this.fb.group({
      servername: ['', [Validators.required]],
      username: ['chotdonngay', [Validators.required]],
      //email: '',
      password: ['chtdonngay@1', [Validators.required]]//[Validators.required, Validators.minLength(6)]
    });

    this.loadServerNames().then(() => {
      this.credentials.patchValue({ servername: (this.serverNames.length ? this.serverNames[0] : '') })
    })
    console.log(this.serverNames);

  }


  selectServer(servername: string) {
    console.log('sdvdfvdserr');

    this.credentials.patchValue({ servername: servername });
    console.log('sdvdfvds');

  }

  async login() {
    const loading = await this.loadingCtrl.create({ mode: 'ios' });
    loading.present();

    this.credentials.patchValue({ servername: this.credentials.value.servername.trim().toLowerCase() });

    let clearSrvname = this.credentials.value.servername;
    clearSrvname = (clearSrvname.substring(clearSrvname.length - 1) === '/') ? clearSrvname.substring(0, clearSrvname.length - 1) : clearSrvname;

    if (!clearSrvname.includes('http://') && !clearSrvname.includes('https://')) {
      clearSrvname = 'http://' + clearSrvname;
    }


    this.apiwp.apiUrl = clearSrvname + '/console/wp-json';

    this.auth.login(this.credentials.value.username, this.credentials.value.password).subscribe({
      next: async (res) => {
        // let data=await lastValueFrom(res);
        console.log('clogffff', res);

        //  SAVE SERVER NAME TO STORAGE =========================
        this.saveServerNames(clearSrvname);


        await loading.dismiss();
        this.router.navigateByUrl('/tabs', { replaceUrl: true });
      },
      error: async (err) => {
        await loading.dismiss();

        // let oldsrvname = this.credentials.value.servername;
        // let oldusrname = this.credentials.value.username;
        // this.credentials.reset();
        // this.credentials.patchValue({ servername: oldsrvname, username: oldusrname });

        console.log(err);

        let msg = (!(err?.error?.message || '').includes('wordpress') ? (err?.error?.message || '') : '').replace(/<[^>]*>/g, '') || 'Loi';//await lastValueFrom(this.translate.get('GLOBAL.ERROR'));
        const alert = await this.alertCtrl.create({
          mode: 'ios',
          header: 'Đăng nhập thất bại',//await lastValueFrom(this.translate.get('AUTH.LOGIN-FAILED')),
          message: msg,
          buttons: ['OK']
        });
        alert.present();
      },
      complete: () => {
        loading.dismiss();
        console.info('complete')
      }
    })

    // this.auth.login(this.credentials.value.username, this.credentials.value.password).subscribe(
    //   async res => {
    //     // let data=await lastValueFrom(res);
    //     console.log('clogffff', res);




    //     //  SAVE SERVER NAME TO STORAGE =========================
    //     this.saveServerNames(clearSrvname);


    //     await loading.dismiss();
    //     this.router.navigateByUrl('/tabs', { replaceUrl: true });
    //   },
    //   async err => {
    //     await loading.dismiss();

    //     let oldsrvname = this.credentials.value.servername;
    //     let oldusrname = this.credentials.value.username;
    //     this.credentials.reset();
    //     this.credentials.patchValue({ servername: oldsrvname, username: oldusrname });

    //     console.log(err);

    //     let msg = (!(err?.error?.message || '').includes('wordpress') ? (err?.error?.message || '') : '').replace(/<[^>]*>/g, '') || 'Loi';//await lastValueFrom(this.translate.get('GLOBAL.ERROR'));
    //     const alert = await this.alertCtrl.create({
    //       mode: 'ios',
    //       header: 'Đăng nhập thất bại',//await lastValueFrom(this.translate.get('AUTH.LOGIN-FAILED')),
    //       message: msg,
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   }

    // );
  }

  async loadServerNames() {
    const result = await Preferences.get({ key: this.keyName.SERVER_NAME });


    console.log(result);

    if (result && result.value) {
      this.serverNames = JSON.parse(result.value);
      console.log('load server name');
    }
    console.log(this.serverNames);

  }

  saveServerNames(name: string) {
    let index = this.serverNames.findIndex(f => f === name);
    if (index >= 0) {
      this.serverNames.splice(index, 1);
    }
    this.serverNames.unshift(name);
    // LIMIT 5 ITEM
    this.serverNames.splice(5);

    if (!this.serverNames.some(f => f === 'http://localhost')) {
      this.serverNames.push('http://localhost');
    }
    if (!this.serverNames.some(f => f === this.originhost) && this.originhost) {
      this.serverNames.push(this.originhost);
    }

    Preferences.set({ key: this.keyName.SERVER_NAME, value: JSON.stringify(this.serverNames) });
  }

  removeServerName(name: string, event: any) {
    event.stopPropagation();
    let index = this.serverNames.findIndex(f => f === name);
    if (index >= 0) {
      this.serverNames.splice(index, 1);
    }
    Preferences.set({ key: this.keyName.SERVER_NAME, value: JSON.stringify(this.serverNames) });
  }


  // signUp() {
  //   this.api.signUp(this.userForm.value.username, this.userForm.value.email, this.userForm.value.password).subscribe(
  //     async res => {
  //         const toast = await this.toastCtrl.create({
  //           message: (res as any).message,
  //           duration: 3000
  //         });
  //         toast.present();
  //     },
  //     err => {
  //       this.showError(err);
  //     }
  //   );
  // }

  // async openPwReset() {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Forgot password?',
  //     message: 'Enter your email or username to retrieve a new password',
  //     inputs: [
  //       {
  //         type: 'text',
  //         name: 'usernameOrEmail'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         role: 'cancel',
  //         text: 'Back'
  //       },
  //       {
  //         text: 'Reset Password',
  //         handler: (data) => {
  //           this.resetPw(data['usernameOrEmail']);
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  // resetPw(usernameOrEmail:string) {
  //   this.api.resetPassword(usernameOrEmail).subscribe(
  //     async res => {
  //       const toast = await this.toastCtrl.create({
  //         message: (res as any).message,
  //         duration: 2000
  //       });
  //       toast.present();
  //     },
  //     err => {
  //       this.showError(err);
  //     }
  //   );
  // }


  logout() {
    this.auth.logout();
  }

  // async showError(err:any) {
  //   const alert = await this.alertCtrl.create({
  //     header: err.error.code,
  //     subHeader: err.error.data.status,
  //     message: err.error.message,
  //     buttons: ['OK']
  //   });
  //   await alert.present();
  // }


  /*
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
  
  
      */
  get servername() {
    return this.credentials.get('servername');
  }

  get username() {
    return this.credentials.get('username');
  }
  get password() {
    return this.credentials.get('password');
  }

}
