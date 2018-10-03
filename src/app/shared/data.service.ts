import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, filter, switchMap, map } from 'rxjs/operators';
import { IComment, IPost } from './element.model';
import { of, Observable, EMPTY } from 'rxjs';
/**
 *  Here we annotate the class with the @Injectable() decorator.
 *  This marks the class as one that participates in the dependency injection system.
 *
 * Registering Service as Provider:
 * We also need to make sure this Class DataService is registered as the provider of this service.
 * You are registering it with an injector, which is the object that is responsible for choosing
 * and injecting the provider where it is required.
 *
 * By default, the Angular CLI command ng generate service registers a provider with the root injector
 *  for your service by including provider metadata in the @Injectable decorator.
 * When you provide the service at the root level, Angular creates a single, shared instance of DataService
 * and injects into any class that asks for it. Registering the provider in the @Injectable metadata also
 * allows Angular to optimize an app by removing the service if it turns out not to be used after all.
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  comments: IComment[];
  posts: IPost[];

  constructor(private http: HttpClient) {
    // on load we receive that HttpClient object to use it private.
   }

   getPosts(): Observable<any> {
     return this.getComments()
      .pipe(
        switchMap(comments => {
          return this.http.get<IPost[]>('https://jsonplaceholder.typicode.com/posts')
            .pipe(
              map((posts: any[]) => {
                posts.map(post => {
                  const postComments = comments.filter(c => c.postId === post.id);
                  post.commentsQnty = postComments.length;
                  return post;
                });
                return posts; // we need to return something! here we returned the new mapped posts array with Qty of comments
              })
            );
        }));
   }

   getPost(postId): Observable<IPost> {
    return this.http.get<IPost>('https://jsonplaceholder.typicode.com/posts/' + postId);
  }

  getComments(): Observable<any>  {
    // we return the Observable, in order to call get posts after.
    return this.http.get('https://jsonplaceholder.typicode.com/comments')
      .pipe(
        tap((data: IComment[]) => {
        console.log('inside getComments tap');
        this.comments = data;
      }));
  }

  getCommentsByPost(postId): Observable<IComment[]> {
    const postIdNum = +postId;
    if (!this.comments) {
      // we will return an observable
      return this.http.get<IComment[]>('https://jsonplaceholder.typicode.com/comments')
        .pipe(
          // tap((data: Comment[]) => this.comments = data),
          filter((comment: IComment) => {
            console.log( comment);
            return comment.postId === postIdNum;
          }));
      // the tap method of RxJS lets us see the value that comes through and take an action
    } else {
      return of(this.comments.filter(comment => comment.postId === postIdNum));
    }
  }
}
