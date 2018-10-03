import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../shared/element.model';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
  styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit {
  posts$: IPost[]; // property to hold the returned data from the api

  // shorthand to create private properties that will be initialized by the constructor
  constructor(private data: DataService, private route: ActivatedRoute) { }

  ngOnInit() { // any code executed here will be called when this component loads
    this.route.data.subscribe((myData) => {
      this.posts$ = myData.posts;
    });
    // we subscribe to the route data, to receive the data from the route resolver
  }

}
