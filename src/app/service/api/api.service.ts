import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  post(data: any) {
    return this.http.post<any>('http://localhost:3000/productList', data);
  }

  get() {
    return this.http.get<any>('http://localhost:3000/productList');
  }

  delete(id: any) {
    return this.http.delete<any>('http://localhost:3000/productList/' + id);
  }

  upadte(data: any, id: any) {
    return this.http.put<any>('http://localhost:3000/productList/' + id, data);
  }
}
