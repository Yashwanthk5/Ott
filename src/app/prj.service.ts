import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PrjService {

  isUserLogged:boolean;
  httpClient: any;

  constructor(private HttpClient:HttpClient) {
    this.isUserLogged=false;
   }
 

  setUserLoggedIn(){
    this.isUserLogged=true;
  }
  getUserLogged():boolean{
    return this.isUserLogged;
  }
  setUserLoggedOut(){
    this.isUserLogged=false;
  }
  registerAdmin(admin:any){
    return this.HttpClient.post('registerAdmin',admin);
  }
  adminLogin(admin:any){
    return this.HttpClient.get('adminLogin/'+admin.emailId+"/"+admin.password).toPromise();
  }

}

