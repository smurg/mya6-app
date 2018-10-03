import { DataService } from '../shared/data.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { IPost } from '../shared/element.model';
// we don't need to declare this service as a provider in the app.module
@Injectable({
  providedIn: 'root',
})
export class PostsResolve implements Resolve<Object> {
  constructor(private dataService: DataService) { }

  resolve(): Observable<IPost[]> {
    // we return that data as an OBSERVABLE.
    return this.dataService.getPosts();
  }
}
