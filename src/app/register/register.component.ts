import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrjService } from '../prj.service';
import { WatchService } from '../watch.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{
  registerForm : FormGroup;
  registerInfo: any;

  constructor(private service : WatchService, private formbuilder: FormBuilder, private router: Router,private toastr: ToastrService ){
    this.registerForm = this.formbuilder.group({
      name:new FormControl(''),
      gender:new FormControl(''),
      number:new FormControl(''),
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

   }
   register( user : any){

    this.service.registerUser(user).subscribe((result: any) => {this.registerInfo = result; console.log(result);});
    this.toastr.success("registration done successfully");
    this.router.navigate(['login']);

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

}
