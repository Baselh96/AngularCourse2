import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DailogComponent } from '../../components/dailog/dailog.component';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productState = new Subject<any[]>();
  public products = this.productState.asObservable();

  private apiService = inject(ApiService);

  postProduct(
    data: any,
    dialogRef: MatDialogRef<DailogComponent>,
    productForm: FormGroup
  ) {
    return this.apiService.post(data).subscribe({
      next: () => {
        alert('Produkt wurde erfolgreich hinzugefügt');
        dialogRef.close();
        productForm.reset();
        this.getProducts();
      },
      error: () => {
        alert('Fehler während der Speicherung des Produkts');
      },
    });
  }

  getProducts() {
    this.apiService.get().subscribe({
      next: (data) => this.productState.next(data),
      error: (error) =>
        alert('Fehler während des Laden der Daten aus dem Server!!'),
    });
  }

  deleteProduct(id: any) {
    this.apiService.delete(id).subscribe(() => this.getProducts());
  }

  upadteProduct(
    data: any,
    id: any,
    dialogRef: MatDialogRef<DailogComponent>,
    productForm: FormGroup
  ) {
    return this.apiService.upadte(data, id).subscribe({
      next: () => {
        dialogRef.close();
        productForm.reset();
        alert('Produkt wurde erfolgreich geändert');
      },
      error: () => {
        alert('Fehler während der Speicherung des Produkts');
      },
    });
  }
}

