import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit {
  posts$: Object; // property to hold the returned data from the api

  constructor(private data: DataService) { }

  ngOnInit() {
    // any code executed here will be called on page load
    this.data.getPosts().subscribe( data => this.posts$ = data ); // we subscribe to the api call, asi it's async
    // it will execute the callback when getPosts return data.
  }

}
