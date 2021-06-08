import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  constructor(protected cartService: CartService, titleService: Title) {
    titleService.setTitle('Cart');
    this.cartService.getCart().subscribe((items) => {
      if (items) {
        this.cartItems = items;
      }
    });
  }

  ngOnInit(): void {
  }

  removeFromCart(item): void {
    this.cartService.removeFromCart(item);
  }

}
