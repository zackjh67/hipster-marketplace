import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  items = [];

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.api.listProducts().pipe(
      map((item) => item[0].replace(',', '').replace(/\./g, '').split(' ')),
      map(async (names) => {
        return Promise.all(names.map(async (name) => {
          const imageUrl = await this.api.getHipsterImage(name).pipe(
            map((p) => {
              return p.hits && p.hits[0] && p.hits[0].previewURL;
            }),
          ).toPromise();
          return { name, imageUrl };
        }));
      }),
    ).subscribe( async (items) => {
      //  map image result onto each result
      console.log('fuckin items!!!: %o', await items);
      this.items = await items;
    });
  }

}
