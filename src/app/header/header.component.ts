import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WatchService } from '../watch.service';

declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  loginStatus : any;
  adminStatus: any;
  user: any;
  registerForm : FormGroup;
  registerInfo: any;
  countries : any;
  passwordIsValid = false;

  constructor(private service : WatchService,private formbuilder: FormBuilder,private router: Router, private toastr:ToastrService)

  {
    this.registerForm = this.formbuilder.group({
      name:new FormControl(''),
      gender:new FormControl(''),
      number:new FormControl(''),
      country:new FormControl(''),
      emailId : new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password : new FormControl('',Validators.required),
      conpassword : new FormControl('',Validators.required)
    },
    {
      validators:this.mustMatch('password','conpassword')
    }
    );
  }

  ngOnInit(): void {
    this.service.getAllCountries().subscribe((data: any) => {this.countries = data; console.log(data);});
      this.service.getLoginStatus().subscribe((data : any) =>{
        this.loginStatus = data;
      });
      this.service.getAdminStatus().subscribe((data : any) =>{
        this.adminStatus = data;
      })
  }

  LoginUser() {

    jQuery('#loginModel').modal('show');
  }

  RegisterUser() {

    jQuery('#registerModel').modal('show');
  }



  async loginSubmit(loginForm: any) {
    console.log(loginForm);
    if(loginForm.emailId=="admin@gmail.com" && loginForm.password=="admin"){
      this.service.setAdminLoggedIn();
      jQuery('#loginModel').modal('hide');
      this.router.navigate(['header1']);
    }else{
    await this.service.userLogin(loginForm).then((data: any) => {
        this.user = data;

        jQuery('#loginModel').modal('hide');
        if(this.user!=null){
          this.service.setUserLoggedIn();
          this.router.navigate(['header2']);

        }else{
          this.toastr.warning("login Failed!!");
        }

      });
    }
    }



    register( user : any){

      this.service.registerUser(user).subscribe((result: any) => {this.registerInfo = result;
        jQuery('#registerModel').modal('hide');
        if(result!=null){
          this.toastr.success("Register Successful");
        }else{
          this.toastr.warning("Register Unsuccesful")
        }
        console.log(result);});

   }

     get f()
      {
         return this.registerForm.controls;
      }

      mustMatch(password : any, conpassword : any)
      {
         return(formGroup: FormGroup) => {
           const passwordc = formGroup.controls[password];
           const conpasswordc = formGroup.controls[conpassword];

           if(passwordc.value !== conpasswordc.value)
           {
               conpasswordc.setErrors({mustMatch : true});
           }else{
             conpasswordc.setErrors(null);
           }
         }
      }
      passwordValid(event: boolean) {
        this.passwordIsValid = event;
      }



}
