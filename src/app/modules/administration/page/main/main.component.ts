import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  public titleBreadCrumb = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.getTitleBreadCrumb();
  }

  getTitleBreadCrumb() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        return child?.snapshot.data['title'] ?? '';
      })
    ).subscribe((title: string) => {
      this.titleBreadCrumb = title;
    });
  }

}
