import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { category } from '../model/category.model';
import { CategoryService } from '../service/category.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  @Output() clickCategoryEvent = new EventEmitter<string>();

  data: category[]=[];
  constructor(
    private categoryList: CategoryService,
    private router: Router
  ){ }

  ngOnInit(): void {
    this.getCatagory();
  }

  getCatagory() {
    this.categoryList.getAllCategories()
    .subscribe((data: category[]) => {
      this.data = data;
    });
  }

  onClickCategory(category: any) {
    this.clickCategoryEvent.emit(category);

    const navigationExtras: NavigationExtras = {
      queryParams: { categoryId: category.id }
    };

    this.router.navigate(['/shop'], navigationExtras);
  }
}
