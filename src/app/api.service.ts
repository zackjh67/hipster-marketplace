import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  hipsterUrl = 'https://hipsum.co/api/';
  imageSearchUrl = 'https://pixabay.com/api/';
  imageSearchKey = '21951804-9f76260d3b7e7bfc5883c1525';

  constructor(private http: HttpClient) { }

  listProducts(): Observable<any> {
    return this.http.get(this.hipsterUrl, { params: { type: 'hipster-centric', sentences: '2' }});
  }

  getHipsterImage(q): Observable<any> {
    return this.http.get(this.imageSearchUrl, { params: { key: this.imageSearchKey, q, safesearch: 'true', per_page: '3' }});
  }
}
