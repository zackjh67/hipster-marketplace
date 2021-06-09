import { Injectable } from '@angular/core';
import {combineLatest, Observable, Subject} from 'rxjs';
import {InventoryService} from './inventory.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  item: Subject<any>;
  itemId: number;

  constructor(protected inventoryService: InventoryService) {
    this.item = new Subject<any>();
    combineLatest(this.item, this.inventoryService.getInventory()).subscribe(([item, inventory]) => {
      if (item && inventory) {
        // TODO this is a realllllly stupid way of doing this but this isn't a real API so its fine lol
        if (item.id && !item.name) {
          // tslint:disable-next-line:triple-equals
          const foundItem = inventory.find((i) => i.id == item.id);
          setTimeout(() => {
            this.item.next(foundItem);
          });
        }
      }
    });
  }

  getSelectedItem(): Observable<any> {
    return this.item.asObservable();
  }

  setSelectedItem(id: any): void {
    this.item.next({ id, name: '', imageUrl: ''});
  }
}
