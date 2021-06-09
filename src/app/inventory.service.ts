import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  inventory: BehaviorSubject<any[]>;

  constructor(api: ApiService) {
    this.inventory = new BehaviorSubject<any[]>(undefined);
    api.listProducts().pipe(
      map((item) => item[0].replace(',', '').replace(/\./g, '').split(' ')),
      map(async (names) => {
        return Promise.all(names.map(async (name, i) => {
          const imageUrl = await api.getHipsterImage(name).pipe(
            map((p: any) => {
              return p.hits && p.hits[0] && p.hits[0].previewURL;
            }),
          ).toPromise();
          const price = this.generatePrice();
          return {
            name,
            imageUrl,
            price,
            id: i,
            quantity: this.generateQuantity(),
            categories: this.generateCategories(),
            salePrice: this.generateSalePrice(price),
            inventoryCount: this.generateInventoryCount(),
            color: this.generateColor(),
            brand: this.generateBrand(),
            size: this.generateSize(),
            stars: this.generateStars(),
          };
        }));
      }),
    ).subscribe( async (items: Promise<any[]>) => {
      //  map image result onto each result
      this.inventory.next(await items);
    });
  }

  getInventory(): Observable<any> {
    return this.inventory.asObservable();
  }

  getRandomIntInclusive(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  generatePrice(): number {
    return this.getRandomIntInclusive(10, 10000);
  }

  generateQuantity(): number {
    return this.getRandomIntInclusive(0, 20);
  }

  generateCategories(): string[] {
    const bottom = this.getRandomIntInclusive(0, 3);
    return ['cat1', 'cat2', 'cat3', 'cat4', 'cat5'].slice(
      this.getRandomIntInclusive(bottom, 4)
    );
  }

  generateSalePrice(price): number | undefined {
    const sp = this.getRandomIntInclusive(1, price - 1);
    if (!(sp % 5)) { return undefined; }
    return sp;
  }

  generateInventoryCount(): number {
    return this.getRandomIntInclusive(0, 35);
  }

  generateColor(): string {
    const colorMap = {
      0: 'red',
      1: 'yellow',
      2: 'orange',
    };
    return colorMap[this.getRandomIntInclusive(0, 2)];
  }

  generateBrand(): string {
    const brandMap = {
      0: 'Organic Inc',
      1: 'Freerange LLC',
      2: 'Portland People Corp',
    };
    return brandMap[this.getRandomIntInclusive(0, 2)];
  }

  generateSize(): string {
    const sizeMap = {
      0: 'small',
      1: 'medium',
      2: 'large',
    };
    return sizeMap[this.getRandomIntInclusive(0, 2)];
  }

  generateStars(): number {
    return this.getRandomIntInclusive(1, 5);
  }
}
