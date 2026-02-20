import { Component } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLinkWithHref],
  template: `
    <section class="home">
      <div class="container d-flex justify-content-center align-items-start flex-column h-100">
        <h1>Great nights start with great pizza.</h1>
        <p class="mb-0">Freshly baked, delivered hot and fast straight to your door.</p>
        <p>
          Your favorite slice is just one click away.
          <a routerLink="/products">Order now</a>
        </p>
      </div>
    </section>
  `,
  styles: `
    .home {
      background-image: url('../../assets/hero-home.jpg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 100vh;
      color: white;
    }

    .container p {
      font-size: 1.1rem;
      letter-spacing: 0.02rem;
      font-weight: 500;
    }

    .container a {
      text-decoration: underline;
      color: #dec8ab;
      border-radius: 20px;
      padding: 1px 5px;
    }

    .container a:hover {
      color: white;
      cursor: grab;
    }
  `,
})
export class Home {}
