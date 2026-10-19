import { Injectable } from '@angular/core';
import { CanMatch, Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { filter, map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanMatch {
  constructor(private authService:Authentication,private router:Router){}
  canMatch():Observable<boolean>{

    return this.authService.isAuthenticated.pipe(
      filter(val=>val!==null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map(isAuthnticated=>{
        console.log("GAUD Authaaa",isAuthnticated);
       if(isAuthnticated){
        // Directly open inside area
        this.router.navigateByUrl('/tabs',{replaceUrl:true});
        return true;
       }else{
        // Simply allow access to the login
        return true;
       }
      })
    )
  }
};