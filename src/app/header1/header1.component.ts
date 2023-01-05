import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WatchService } from '../watch.service';

declare var jQuery: any;

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css']
})
export class Header1Component implements OnInit{

  constructor(private service : WatchService,private router: Router){

  }

  ngOnInit(): void {
  }

  addVideoModel(){
    jQuery('#addVideoModel').modal('show');
  }

  videoSubmit(video : any){
    console.log(video);
    this.service.addVideo(video).subscribe((result: any)=>{
      jQuery('#addVideoModel').modal('hide');
      console.log(result);
    })
  }

  logout(){
    this.router.navigate(['logout']);
  }

}
