import { Component } from '@angular/core';
import {CartService} from './cart.service';
import {Title} from '@angular/platform-browser';

declare let sandbox: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cool-shopping-app';

  constructor(public cartService: CartService, public titleService: Title) {
    if (sandbox) {
      sandbox.init({
        site_name: 'BLACKCROW',
        homepage_url: '/',
        site_country: 'US',
        site_language: 'en',
        is_logged_in_user: false,
        user_has_subscription: false,
        store_id: 69
      });
    }
  }
}
