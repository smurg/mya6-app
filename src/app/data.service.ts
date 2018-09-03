import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// we need to also import it on the app.module

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    // on load we receive that HttpClient object to use it private.
   }

   getPosts() {
     return this.http.get('https://jsonplaceholder.typicode.com/posts');
   }

   getPost(postId) {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/' + postId);
  }

  getComments() {
    return this.http.get('https://jsonplaceholder.typicode.com/comments');
  }
}
