import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../inventory.service';
import {Title} from '@angular/platform-browser';
import {Utils} from '../Utils';

declare let sandbox: any;

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  items: any[] = [];

  constructor(protected inventoryService: InventoryService, titleService: Title) {
    titleService.setTitle('Hipster Marketplace');
  }

  ngOnInit(): void {
    this.inventoryService.getInventory().subscribe((inventory) => {
      if (inventory) {
        this.items = inventory;
        sandbox.set_items(Utils.formatItemListForSandbox(this.items));
      }
    });
    sandbox.set_filters(
      [
        new sandbox.Filter('price', 'lt', 'hipster'),
        new sandbox.Filter('brand', 'gt', 'hipster')
      ]
    );
    sandbox.set_sort_type(['price', 'how_hipster']);
  }

}
