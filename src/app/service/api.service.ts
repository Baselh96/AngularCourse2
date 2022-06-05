import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  dataSource !: MatTableDataSource<any>;


  constructor(private http: HttpClient) { }

  postProduct(data:any) {
    return this.http.post<any>("http://localhost:3000/productList", data);
  }

  getProduct() {
    return this.http.get<any>("http://localhost:3000/productList");
  }

  deleteProduct(id: any) {
    console.log(id)
    return this.http.delete<any>("http://localhost:3000/productList/" + id);
  }

  upadteProduct(data:any, id: any) {
    return this.http.put<any>("http://localhost:3000/productList/" + id, data);
  }
}
