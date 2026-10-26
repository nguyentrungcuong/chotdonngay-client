import { Component, OnInit } from '@angular/core';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonNote, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar, ModalController } from '@ionic/angular';
import { Theme } from '../../services/theme';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { chevronBack, language, moon } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Preferences } from '@capacitor/preferences';
import { KeyName } from '../../services/key-name';
import { Language } from '../../services/language';

@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss'],
  imports: [IonContent, TranslatePipe, IonHeader, IonToolbar, IonLabel, IonSelect, IonSelectOption, IonButtons, IonButton, IonNote, IonBackButton, IonTitle, IonIcon, IonList, IonListHeader, IonItem, IonToggle],
})
export class GeneralSettingsComponent implements OnInit {
  readonly paletteToggle = this.theme.paletteToggle();
  readonly lang = this.languageService.lang();
  constructor(
    private theme: Theme,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private key: KeyName,
    private languageService:Language
  ) {
    addIcons({ moon, language, chevronBack });
  }

  ngOnInit() {
 
  }

  changeDarkMode(event: CustomEvent) {
    this.theme.toggleChange(event);
  }


  changeLanguage(event: CustomEvent) {
    this.languageService.lang.set(event.detail.value);
    this.translate.use(this.languageService.lang());

    Preferences.set({ key: this.key.LANG, value: this.languageService.lang()});
  }

  cancel() {
    this.modalCtrl.dismiss()
  }
}
