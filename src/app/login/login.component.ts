import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import {PrjService} from '../prj.service'
import { WatchService } from '../watch.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any;

  constructor(private service: WatchService, private router: Router) {
  }
  ngOnInit(): void {
  }


  async loginSubmit(loginForm: any) {
    console.log(loginForm);

    await this.service.userLogin(loginForm).then((data: any) => {
        this.user = data;
        this.service.setUserLoggedIn();
        this.router.navigate(['home']);
      });

    }


}
