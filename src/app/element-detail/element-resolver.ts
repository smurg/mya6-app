import { IComment } from '../shared/element.model';
import { DataService } from '../shared/data.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
// we don't need to declare this service as a provider in the app.module
@Injectable({
  providedIn: 'root',
})
export class PostResolve implements Resolve<Object> {
  constructor(private dataService: DataService, private router: Router) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<any> | Promise<any> | any {
    /*
    Here we will tipically make an async call, like an AJAX call and then when we return,
    we return that data as an OBSERVABLE.
    */
    return this.dataService.getPost(route.params['id'])
      .pipe(mergeMap((post) => {
        if (post) {
          return of(post);
        } else {
          this.router.navigate(['/elements']);
          return EMPTY;
        }
      })
      );
  }
}
/** Why use a Resolve Guard??? Fetch data before navigating
 * If you were using a real world API, there might be some delay before the data to display
 * is returned from the server. You don't want to display a blank component while waiting for the data.
 *
 * It's preferable to pre-fetch data from the server so it's ready the moment the route is activated.
 * This also allows you to handle errors before routing to the component. There's no point in navigating
 * to a detail page for an id that doesn't have a record. It'd be better to send the user back to the
 * Master List that shows only valid data.
 *
 * => In summary, you want to delay rendering the routed component until all necessary data have been fetched.
 * YOU need a Resolver!
 */


@Injectable({
  providedIn: 'root',
})
export class CommentsResolve implements Resolve<Object> {
  constructor(private dataService: DataService) { }

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IComment[]> {
    /*
    Here we will tipically make an async call, like an AJAX call and then when we return,
    we return that data as an OBSERVABLE.
    */
    return this.dataService.getCommentsByPost(route.params['id']);
  }
}
