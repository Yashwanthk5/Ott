import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { HeaderComponent } from './header/header.component';
import { Header1Component } from './header1/header1.component';
import { Header2Component } from './header2/header2.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [

  {path:'',component:HeaderComponent},
  {path:'header',component:HeaderComponent},
  {path:'home',component:HomeComponent},
  {path:'logout',component:LogoutComponent},
  {path:'adminhome',component:AdminhomeComponent},
  {path:"header1",component:Header1Component},
  {path:"header2",component:Header2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
