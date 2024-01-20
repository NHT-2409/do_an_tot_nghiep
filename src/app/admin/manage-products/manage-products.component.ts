import { Component, ElementRef } from '@angular/core';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { ManageProductsAddComponent } from './manage-products-add/manage-products-add.component';
import { ManageProductsEditComponent } from './manage-products-edit/manage-products-edit.component';
import { ToastService } from 'src/app/service/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { ImageViewComponent } from 'src/app/image-view/image-view.component';
import { BrandService } from 'src/app/service/brand.service';
import { LoadingService } from 'src/app/service/loading.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent {
  products: any = [];
  categories: any;
  brands: any;
  currentPage: number = 1;
  showFilterDropdown: boolean = false;
  ascendingOrder: boolean = true;


  constructor(
    private toastService: ToastService,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private productService: ProductService,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private loadingService: LoadingService,
  ){}

  ngOnInit(): void {
    this.getCategory();

  }

  toggleFilter() {
    this.showFilterDropdown = !this.showFilterDropdown;

    if (this.showFilterDropdown) {
      this.ascendingOrder = !this.ascendingOrder;

      this.products.sort((a: { id: number }, b: { id: number }) => {
        console.log("🚀 ~ ManageProductsComponent ~ a:", a.id)

        return this.ascendingOrder ? a.id - b.id : b.id - a.id;
      });
    } else {

      this.products = [...this.products];
    }
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((res: any) => {
      this.products = res;
      this.loadingService.hideLoading();
    })
  }

  getBrands() {
    this.brandService.getAllBrands().subscribe((res: any) => {
      this.brands = res;
    })
  }

  getCategory() {
    this.loadingService.showLoading();
    this.categoryService.getAllCategories().subscribe((res: any) => {
      this.categories = res;
      this.getProducts();
      this.getBrands();
    })
  }

  getCategoryName(id: string): string {
    const category = this.categories.find((res: any) => res.id === id);
    return category ? category.name : '';
  }

  getBrandName(id: string): string {
    const brand = this.brands.find((res: any) => res.id === id);
    return brand ? brand.name : '';
  }

  add() {
    const dialogRef = this.dialog.open(ManageProductsAddComponent, {
      width: '700px',
      data: {
        categories: this.categories,
        brands: this.brands
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  update(item: any) {
    const dialogRef = this.dialog.open(ManageProductsEditComponent, {
      width: '700px',
      data: {
        categories: this.categories,
        product: item,
        brands: this.brands
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getProducts();
    });
  }

  deleteProduct(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete?`,
        message: `Confirm delete?`
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(item?.id).subscribe(res =>{
        }, (err) => {
          switch(err?.error?.text) {
            case 'deleted': {
              this.toastService.show(`Delete ${item?.name} successfully!`);
              this.getProducts();
              break;
            }
          }
        })
      }
    });
  }

  viewImage(url: string) {
    const dialogRef = this.dialog.open(ImageViewComponent, {
      width: '600px',
      height: '600px',
      data: {
        imageUrl: url
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

    // Nếu filterValue rỗng, hiển thị lại toàn bộ dữ liệu
    if (!filterValue) {
      this.getProducts();
      return;
    }

    // Thực hiện lọc dữ liệu dựa trên filterValue
    this.products = this.products.filter((item: { name: string; }) => {
      // Thực hiện lọc ở đây, ví dụ:
      // Nếu muốn lọc theo tên sản phẩm, thay 'name' bằng tên field muốn lọc
      return item.name.toLowerCase().includes(filterValue);
    });

    // Reset lại trang về 1 khi áp dụng bộ lọc
    this.currentPage = 1;
  }


}
