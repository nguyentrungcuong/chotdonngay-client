import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { KeyName } from './key-name';
import { Platform } from '@ionic/angular';
import { ApiWordpress } from './api-wordpress';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Utilities } from './utilities';
import { User } from '../interfaces/wordpress';



@Service()
export class Authentication {
    isAuthenticated: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);
    token: string = '';

    private http = inject(HttpClient);
    private key = inject(KeyName);
    private plt = inject(Platform);
    private apiwp = inject(ApiWordpress);
    private utilities = inject(Utilities);
    constructor() {
        this.plt.ready().then(() => {
            this.loadToken();
        });
    }


    async loadToken() {

        // LOAD USER =====================
        const jwt = await Preferences.get({ key: this.key.JWT_KEY });
        if (jwt && jwt.value) {
            let usr: User = JSON.parse(jwt.value);
            if (usr && usr.token) {

                const decoded: JwtPayload = jwtDecode(usr.token);

                console.log(decoded);

                // CHECK EXP
                if (decoded.iss && decoded.exp) {
                    const dateExp = new Date(decoded.exp * 1000);
                    const dateNow = new Date();

                    if (dateExp > dateNow) {
                        this.apiwp.apiUrl = decoded.iss + '/wp-json';
                        console.log('set token', usr);
                        this.token = usr.token;
                        usr.token = '';
                        console.log('usrData', usr);

                        this.apiwp.user.next(usr);
                        // this.user.next(JSON.parse(jwt.value));
                        this.isAuthenticated.next(true);
                        console.log('load token adn set truee',);
                    }
                }
            }

        } else {
            this.isAuthenticated.next(false);
        }
    }



    login(username: string, password: string) {
        return this.http.post(`${this.apiwp.apiUrl}/jwt-auth/v1/token`, { username, password }, { timeout: 8000 }).pipe(
            map((objData) => {
                let usr:User =  (objData as any).user;
                return usr;
            }),
            switchMap(async usr => {
                //return from(Preferences.set({ key: this.key.JWT_KEY, value: JSON.stringify(data) }));
                Preferences.set({ key: this.key.JWT_KEY, value: JSON.stringify(usr) });
                return usr;
            }),
            tap(usr => {
                this.isAuthenticated.next(true);

                this.token = usr.token;
                usr.token = '';
                console.log(usr);

                this.apiwp.user.next(usr);
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
