import { Component } from '@angular/core';
import {CartService} from './cart.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cool-shopping-app';

  constructor(public cartService: CartService, public titleService: Title) {
  }
}
