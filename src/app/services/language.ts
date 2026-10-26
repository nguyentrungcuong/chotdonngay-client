import { inject, Service, signal } from '@angular/core';
import { Platform } from '@ionic/angular';
import { KeyName } from './key-name';
import { Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';

@Service()
export class Language {
    private plt = inject(Platform);
    private key = inject(KeyName);
    private translate = inject(TranslateService);
    lang = signal('vi');
    constructor() {
        this.plt.ready().then(async () => {
            // `lang` and `fallbackLang` from provideTranslateService() are already applied;
            // call addLangs() to register additional languages the user can switch to.
            this.translate.addLangs(['vi', 'en']);

            const result = await Preferences.get({ key: this.key.LANG });

            if (result && result.value) {
                this.lang.set(result.value);
            } else {
                const browserLang = this.translate.getBrowserLang();
                if (browserLang?.match(/en|vi/)) {
                    this.lang.set(browserLang);
                }
            }

            this.translate.use(this.lang());
        })
    }
}
