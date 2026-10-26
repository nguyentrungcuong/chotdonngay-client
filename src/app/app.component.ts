import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
register();

import { Theme } from './services/theme';
import { Language } from './services/language';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private language = inject(Language); // Init language translate
  private theme = inject(Theme); // Init theme Dark Mode
  constructor() {
    this.initApp();
  }

  initApp() {

  }

}

