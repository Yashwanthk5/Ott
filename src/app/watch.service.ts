import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchService {
  isUserLogged : boolean;
  loginStatus : Subject<any>;
  isAdminLogged : boolean;
  adminStatus : Subject<any>;

  constructor(private httpClient : HttpClient) {
    this.isUserLogged = false;
    this.loginStatus = new Subject();
    this.isAdminLogged = false;
    this.adminStatus = new Subject();
   }

   getAllCountries(){
      return this.httpClient.get("https://restcountries.com/v3.1/all");
   }


   getLoginStatus(): any
   {
      return this.loginStatus.asObservable();
   }

   getAdminStatus(): any
   {
      return this.adminStatus.asObservable();
   }

   setUserLoggedIn(){
    this.isUserLogged = true;
    this.loginStatus.next(this.isUserLogged);
   }

   setAdminLoggedIn(){
    this.isAdminLogged = true;
    this.adminStatus.next(this.isAdminLogged);
   }

   setUserLoggedOut(){
    this.isUserLogged = false;
    this.loginStatus.next(this.isUserLogged);
    this.isAdminLogged = false;
    this.adminStatus.next(this.isAdminLogged);
   }


   getUserLogged() : boolean {
    return this.isUserLogged;
   }

   getAdminLogged() : boolean {
    return this.isAdminLogged;
   }

   registerUser(user: any) {
    return this.httpClient.post('registerUser', user);
  }

  userLogin(user: any) {
    return this.httpClient.get('userLogin/' + user.emailId + "/" + user.password).toPromise();
  }

  addVideo(video: any) {
    return this.httpClient.post('addVideo',video);
  }
}
