import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

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
  }

  removeFromCart(item: any): void {
    const currentCart = this.cart.getValue();
    const index = currentCart.indexOf(item);
    if (index > -1) {
      currentCart.splice(index, 1);
    }
    this.cart.next(currentCart);
  }
}
