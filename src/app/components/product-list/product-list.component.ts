import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DailogComponent } from '../dailog/dailog.component';
import { ProductService } from '../../service/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  public displayedColumns: string[] = [
    'productName',
    'categorie',
    'date',
    'produktZustand',
    'price',
    'productDescription',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public dataSource!: MatTableDataSource<any>;

  constructor(
    public productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.productService.products.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllProducts() {
    this.productService.getProducts();
  }

  editProduct(product: any) {
    this.dialog
      .open(DailogComponent, {
        width: '600px',
        data: product,
      })
      .afterClosed()
      .subscribe({
        next: () => {
          this.getAllProducts();
        },
      });
  }

  deleteProduct(data: any) {
    this.productService.deleteProduct(data.id);
  }
}
