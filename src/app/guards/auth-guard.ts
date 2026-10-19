import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment } from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { Authentication } from '../services/authentication';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanMatch {
  constructor(private authService:Authentication,private router:Router){}
  canMatch():Observable<boolean>{
    return this.authService.isAuthenticated.pipe(
      filter(val=>val!==null),
      take(1),
      map(isAuthnticated=>{
        console.log("GAUD Auth",isAuthnticated);
        
       if(isAuthnticated){
        return true;
       }else{
        this.router.navigateByUrl('/login');
        return false;
       }
      })
    )
  }
};
