import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUrl: string; // this will contains the path that the user is currently on

  constructor(private router: Router) {
    router.events.subscribe((nav: NavigationEnd) => this.currentUrl = nav.url);
  }

  ngOnInit() {
  }

}
