import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, from, map, Observable, switchMap, tap } from 'rxjs';
import { KeyName } from './key-name';

@Service()
export class Authentication {

    constructor() {
        console.log('Service initialized!'); // This works
        this.loadToken();
      }

    isAuthenticated: BehaviorSubject<boolean|null> = new BehaviorSubject<boolean|null>(null);
    token: string = '';

    private http = inject(HttpClient);
    private key = inject(KeyName);


    async loadToken() {
        const token=await Preferences.get({key:this.key.TOKEN_KEY});
        console.log('heheheheh',token);
        
        if(token&&token.value){
            console.log('set token',token.value);
            this.token=token.value;
            this.isAuthenticated.next(true);
            console.log('load token adn set truee',);
        }else{
            this.isAuthenticated.next(false);
        }

    }

    login(credentials: { email: string, password: string }): Observable<any> {
        return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
            map((data: any) => data.token),
            switchMap(token => {
                console.log('set token',token);
                
                return from(Preferences.set({ key: this.key.TOKEN_KEY, value: token }));
            }),
            tap(_ => {
                this.isAuthenticated.next(true);
            })
        )

    }

    logout():Promise<void> {
        this.isAuthenticated.next(false);
       return Preferences.remove({key:this.key.TOKEN_KEY});
    }
}
