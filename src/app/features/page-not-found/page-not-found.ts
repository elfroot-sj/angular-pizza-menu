import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLinkWithHref],
  template: `
    <div class="container text-center mt-5">
      <h1>404</h1>
      <p>Page not found.</p>
      <a routerLink="/" class="btn btn-primary mt-3">Return to Home Page</a>
    </div>
  `,
})
export class PageNotFound {}
