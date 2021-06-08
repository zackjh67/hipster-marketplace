import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../inventory.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  items = [];

  constructor(protected inventoryService: InventoryService, titleService: Title) {
    titleService.setTitle('Hipster Marketplace');
  }

  ngOnInit(): void {
    this.inventoryService.getInventory().subscribe((inventory) => {
      this.items = inventory;
    });
  }

}
