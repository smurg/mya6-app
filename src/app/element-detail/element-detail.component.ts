import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
import { IPost, IComment } from '../shared/element.model';

@Component({
  selector: 'app-element-detail',
  templateUrl: './element-detail.component.html',
  styleUrls: ['./element-detail.component.scss']
})
export class ElementDetailComponent implements OnInit {

  element: IPost;
  comments: IComment;

  constructor(private route: ActivatedRoute, private data: DataService) { }

  ngOnInit() {
    this.route.data.subscribe((myData) => {
      this.element = myData.post;
      this.comments = myData.comments;
    });
  }

}
