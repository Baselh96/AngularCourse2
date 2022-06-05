import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DailogComponent } from '../dailog/dailog.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit  {

  displayedColumns: string[] = ['productName', 'categorie', 'date', 'produktZustand', "price", "productDescription", "actions"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor( public apiService: ApiService, private dialog: MatDialog) {  }
  
  ngOnInit(): void {
      this.getAllProducts();
  }
    
    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.apiService.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.apiService.dataSource.paginator) {
      this.apiService.dataSource.paginator.firstPage();
    }
  }
  getAllProducts() {
    this.apiService.getProduct()
    .subscribe({  
      next: (res) => {
        this.apiService.dataSource = new MatTableDataSource(res);
        this.apiService.dataSource.paginator = this.paginator;
        this.apiService.dataSource.sort = this.sort;
      },
      error: (error) => {
        alert("Fehler während des Laden der Daten aus dem Server!!");
      }
    });
  }

  editProduct(product: any) {
    this.dialog.open(DailogComponent, {
      width: '600px',
      data: product
    }).afterClosed().subscribe({
      next: () => {
        this.getAllProducts();
      }
    })
  }

  deleteProduct(data: any) {
    this.apiService.deleteProduct(data.id).subscribe({
      next: () => {
        this.getAllProducts();
      }
    });
  }
}
