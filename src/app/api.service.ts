import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  hipsterUrl = 'https://hipsum.co/api/';
  imageSearchUrl = 'https://pixabay.com/api/';
  imageSearchKey = '';

  constructor(private http: HttpClient) { }

  listProducts() {
    return this.http.get(this.hipsterUrl, { params: { type: 'hipster-centric', sentences: '2' }});
  }

  getHipsterImage(q) {
    return this.http.get(this.imageSearchUrl, { params: { key: this.imageSearchKey, q, safesearch: 'true', per_page: '3' }});
  }
}
