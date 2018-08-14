import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-element-detail',
  templateUrl: './element-detail.component.html',
  styleUrls: ['./element-detail.component.scss']
})
export class ElementDetailComponent implements OnInit {

  userId$: String;

  constructor(private route: ActivatedRoute, private data: DataService) {
    this.route.params.subscribe( params => this.userId$ = params.id );
  }

  ngOnInit() {
  }

}
