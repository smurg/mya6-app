import { PostResolve, CommentsResolve } from './element-detail/element-resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementsComponent } from './elements/elements.component';
import { HomeComponent } from './home/home.component';
import { ElementDetailComponent } from './element-detail/element-detail.component';
import { PageNotFoundComponent } from './not-found.component';
import { PostsResolve } from './elements/elements-resolver';

const routes: Routes = [
  {
    path: 'elements',
    component: ElementsComponent,
    resolve: { // Angular's router supports as many resolvers per route as you want.
      posts: PostsResolve
    }
  },
  {
    path: 'element/:id',
    component: ElementDetailComponent,
    resolve: { // Angular's router supports as many resolvers per route as you want.
      post: PostResolve,
      comments: CommentsResolve
    } // The route won't be activated until ALL resolves are complete/fulfilled.
  },
  { path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

// Each Route maps a URL path to a component.
// The order of the routes in the configuration matters and this is by design.
// The router uses a first-match wins strategy when matching routes, so more specific routes should be placed above less specific routes.
// - The :id in the second route is a token for a route parameter. In a URL such as /hero/42, "42" is the value of the id parameter.
// - The empty path in the thirth route represents the default path for the application, the place to go when the path in the URL is empty,
//      as it typically is at the start.
// - The ** path in the last route is a wildcard. The router will select this route if the requested URL doesn't match any paths for routes
//      defined earlier in the configuration. This is useful for displaying a "404 - Not Found" page or redirecting to another route.
@NgModule({
  imports: [RouterModule.forRoot(routes,
            { enableTracing: true } // <-- debugging purposes only:
          )], // This outputs each router event that took place during each navigation lifecycle to the browser console.
  exports: [RouterModule]
})
export class AppRoutingModule { }
