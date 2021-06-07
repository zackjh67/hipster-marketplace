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
          return { name, imageUrl, id: i };
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
}
