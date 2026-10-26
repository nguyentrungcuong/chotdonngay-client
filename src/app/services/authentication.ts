import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { KeyName } from './key-name';
import { Platform } from '@ionic/angular';
import { ApiWordpress } from './api-wordpress';

@Service()
export class Authentication {
    isAuthenticated: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
    token: string = '';

    private http = inject(HttpClient);
    private key = inject(KeyName);
    private plt = inject(Platform);
    private apiwp = inject(ApiWordpress);

    constructor() {
        this.plt.ready().then(() => {
            this.loadToken();
        });
    }


    async loadToken() {

        // LOAD USER =====================
        const jwt = await Preferences.get({ key: this.key.JWT_KEY });
        if (jwt && jwt.value) {
            let usrData = JSON.parse(jwt.value);
            if (usrData && usrData.token) {
                console.log('set token', usrData);
                this.token = usrData.token;
                usrData.token='';
                this.apiwp.user.next(usrData)
                // this.user.next(JSON.parse(jwt.value));
                this.isAuthenticated.next(true);
                console.log('load token adn set truee',);
            }

        } else {
            this.isAuthenticated.next(false);
        }
    }



    login(username: string, password: string) {
        return this.http.post(`${this.apiwp.apiUrl}/jwt-auth/v1/token`, { username, password },{timeout:8000}).pipe(
            map((objData) => {
                let data = JSON.parse(JSON.stringify(objData));
                data.api_url = this.apiwp.apiUrl;
                console.log(data);
                
                return data;
            }),
            switchMap(async data => {
                //return from(Preferences.set({ key: this.key.JWT_KEY, value: JSON.stringify(data) }));
                Preferences.set({ key: this.key.JWT_KEY, value: JSON.stringify(data) });
                return data;
            }),
            tap(data => {
                this.isAuthenticated.next(true);

                this.token = data.token;
                data.token='';
                this.apiwp.user.next(data);
            })
        )
        
        
    }


    async logout(): Promise<void> {
        this.isAuthenticated.next(false);

        return Preferences.remove({ key: this.key.JWT_KEY }).then(() => {
            this.token = '';
            this.apiwp.user.next(null);
        })
    }

}
