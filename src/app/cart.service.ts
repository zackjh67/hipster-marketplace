import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Utils} from './Utils';

declare let sandbox: any;

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: BehaviorSubject<any[]>;

  constructor() {
    this.cart = new BehaviorSubject<[]>([]);
  }

  getCart(): Observable<any> {
    return this.cart.asObservable();
  }

  addToCart(item: any): void {
    this.cart.next((this.cart.getValue() as any).concat([item]));
    sandbox.add_to_cart(Utils.formatItemForSandbox(item));
  }

  removeFromCart(item: any): void {
    const currentCart = this.cart.getValue();
    const index = currentCart.indexOf(item);
    if (index > -1) {
      currentCart.splice(index, 1);
      sandbox.remove_from_cart(Utils.formatItemForSandbox(item));
    }
    this.cart.next(currentCart);
  }
}
