
/*
import { Injectable } from '@angular/core';
import { CanMatch, Router } from '@angular/router';

import { Preferences } from '@capacitor/preferences';
import { KeyName } from '../services/key-name';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanMatch {
  constructor(private router: Router,private key:KeyName) { }
  async canMatch(): Promise<boolean> {
    const hasSeenIntro = await Preferences.get({ key: this.key.INTRO_SEEN });
    if (hasSeenIntro && (hasSeenIntro.value === 'true')) {
      return true;
    }else{
      this.router.navigateByUrl('/intro',{replaceUrl:true});
      return false;
    }
  }
}
  */
  
import { Injectable } from '@angular/core';
import { CanMatch, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { KeyName } from '../services/key-name';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanMatch {
  constructor(private router:Router, private key:KeyName){}
  async canMatch(): Promise<boolean>{

    const hasSeenIntro = await Preferences.get({ key:this.key.INTRO_SEEN });
    if (hasSeenIntro && (hasSeenIntro.value==='true')) {
      return true;
    }
    else{
      this.router.navigateByUrl('/intro',{replaceUrl:true});
      return true;
    }
  }
};
