import { inject, Service, signal } from '@angular/core';
import { Platform } from '@ionic/angular';
import { KeyName } from './key-name';
import { Preferences } from '@capacitor/preferences';

@Service()
export class Theme {
    private plt = inject(Platform);
    private key = inject(KeyName);
    readonly paletteToggle = signal(false);
    constructor() {
        this.plt.ready().then(() => {

            // Use matchMedia to check the user preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
            
            Preferences.get({ key: this.key.DARK_MODE }).then(res => {
                if (res && res.value) {
                    this.paletteToggle.set(res.value === '1');
                    this.initializeDarkPalette(this.paletteToggle());
                } else {
                    // Initialize the dark palette based on the initial
                    // value of the prefers-color-scheme media query
                    this.initializeDarkPalette(prefersDark.matches);

                }
            });

            // Listen for changes to the prefers-color-scheme media query
            prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
        })
    }


    // Check/uncheck the toggle and update the palette based on isDark
    initializeDarkPalette(isDark: boolean) {
        this.paletteToggle.set(isDark);
        this.toggleDarkPalette(isDark);
    }

    // Listen for the toggle check/uncheck to toggle the dark palette
    toggleChange(event: CustomEvent) {
        this.initializeDarkPalette(event.detail.checked);
        Preferences.set({ key: this.key.DARK_MODE,value:(this.paletteToggle()?'1':'0')});
    }

    // Add or remove the "ion-palette-dark" class on the html element
    toggleDarkPalette(shouldAdd: boolean) {
        document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    }

}
