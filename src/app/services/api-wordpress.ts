import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { KeyName } from './key-name';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, map } from 'rxjs';


@Service()
export class ApiWordpress {
    private http = inject(HttpClient);
    private key = inject(KeyName);
    private plt = inject(Platform);

    user = new BehaviorSubject<any>(null);
    apiUrl:string='http://localhost/console/wp-json';

    constructor() {
        console.log('Service api!'); // This works
           // LOAD API SERVER NAME ====================
           this.plt.ready().then(async () => {
            const result = await Preferences.get({ key: this.key.SERVER_NAME });
            if (result && result.value) {
                let svrnames = JSON.parse(result.value);
                if (svrnames.length) {
                    console.log('Service api!'); // This works
                    this.apiUrl = svrnames[0] + '/console/wp-json';
                }
            }
        })
    }

    getPosts() {
        return this.http.get<any[]>(`${this.apiUrl}/wp/v2/posts`).pipe(
            map(data => {
                return data;
            })
        );
    }

    // getPrivatePosts() {
    //     return this.http.get<any[]>(`${environment.apiUrl}/wp/v2/posts?_embed&status=private`).pipe(
    //         map(data => {
    //             for (let post of data) {
    //                 if (post['_embedded']['wp:featuredmedia']) {
    //                     post.media_url =
    //                         post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
    //                 }
    //             }
    //             return data;
    //         })
    //     );
    // }


    getCurrentUser() {
        return this.user.asObservable();
    }

    getUserValue() {
        return this.user.getValue();
    }

}
