import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../model/product.model';
import { brand } from '../model/brand.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiURL = 'http://localhost:7149/api/Product';

  getAllProducts(): Observable<product[]> {
    return this.httpClient.get<any>(this.apiURL + `/GetProductsList`);
  }

  getTotal() {
    return this.httpClient.get(this.apiURL + '/GetTotalOfProdcut');
  }

  addProduct(product: any) {
    return this.httpClient.post(this.apiURL + `/InsertProduct`, product)
  }

  updateProduct(product: any) {
    return this.httpClient.put(this.apiURL +`/UpdateProduct`, product)
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(this.apiURL + `/DeleteProduct/${id}`)
  }

  getByCategory(categoryParams: any) {
    return this.httpClient.get(this.apiURL + '/GetProductsByCategory' + `?category=${categoryParams?.name}&count=500`

    );
  }

  getByBrand(brandParams: any) {
    console.log("🚀 ~ ProductService ~ categoryParams:", brandParams.name);
    return this.httpClient.get(this.apiURL + `/GetProductsByBrand?brand=${brandParams?.name}&count=100`
    );
  }

  getProductsByBrandAndCategory(brandId: string, categoryId: string) {
    return this.httpClient.get(this.apiURL + `/GetProductsByBrandAndCategory?brandId=${brandId}&categoryId=${categoryId}&count=100`);
  }

  getById(id: any) {
    return this.httpClient.get(this.apiURL + `/GetProductById/${id}`);
  }

}


