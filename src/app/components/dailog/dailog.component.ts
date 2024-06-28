import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../../service/product/product.service';

@Component({
  selector: 'app-dailog',
  templateUrl: './dailog.component.html',
  styleUrls: ['./dailog.component.scss'],
})
export class DailogComponent implements OnInit {
  freshnessList = ['ganz neu', 'gebraucht', 'defekt'];
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public productService: ProductService,
    private dialogRef: MatDialogRef<DailogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      categorie: ['', Validators.required],
      date: ['', Validators.required],
      produktZustand: ['', Validators.required],
      price: ['', Validators.required],
      productDescription: ['', Validators.nullValidator],
    });

    if (this.editData) {
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['categorie'].setValue(this.editData.categorie);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['produktZustand'].setValue(
        this.editData.produktZustand
      );
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['productDescription'].setValue(
        this.editData.productDescription
      );
    }
  }

  addProduct() {
    if (this.productForm.valid) {
      if (!this.editData) {
        this.productService.postProduct(
          this.productForm.value,
          this.dialogRef,
          this.productForm
        );
      } else {
        this.productService.upadteProduct(
          this.productForm.value,
          this.editData.id,
          this.dialogRef,
          this.productForm
        );
      }
    }
  }
}
