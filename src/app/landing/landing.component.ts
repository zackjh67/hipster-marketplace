import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../inventory.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  items = [];

  constructor(protected inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.inventoryService.getInventory().subscribe((inventory) => {
      this.items = inventory;
    });
  }

}
