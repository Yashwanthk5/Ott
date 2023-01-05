import { Component, OnInit } from '@angular/core';
import { WatchService } from '../watch.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{

constructor(private service : WatchService){

}
  ngOnInit(): void {

  }


}
