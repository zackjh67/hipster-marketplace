import { Component } from '@angular/core';
import {CartService} from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cool-shopping-app';

  constructor(public cartService: CartService) {
  }
}
