import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ItemService} from '../item.service';
import {CartService} from '../cart.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit, OnDestroy {
  item: any;
  routeSub: any;
  itemServiceSub: any;

  constructor(titleService: Title,
              protected itemService: ItemService,
              protected cartService: CartService,
              protected route: ActivatedRoute) {
    this.itemServiceSub = this.itemService.getSelectedItem().subscribe((item) => {
      if (item) {
        this.item = item;
        titleService.setTitle(this.item.name || 'Item');
      }
    });
    this.routeSub = this.route.params.subscribe((params) => {
      this.itemService.setSelectedItem(params.id);
    });
  }

  ngOnInit(): void {
  }

  addToCart(): void {
    this.cartService.addToCart(this.item);
  }

  ngOnDestroy(): void {
    this.routeSub ? this.routeSub.unsubscribe() : undefined;
    this.itemServiceSub ? this.itemServiceSub.unsubscribe() : undefined;
  }

}
