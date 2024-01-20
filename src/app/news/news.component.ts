import { Component } from '@angular/core';
import { LoadingService } from '../service/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../service/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  news:any;
  newsId:any;

   constructor(
     private router: Router,
     public loadingService: LoadingService,
     public newsService: NewsService,
     private route: ActivatedRoute,

   ) { }

   ngOnInit() {
    this.route.params.subscribe(params => {
      this.newsId = params['id'];
      console.log("🤜 ~ news-description:", this.newsId);
      this.newsService.getNewsById(this.newsId).subscribe((data) => {
        this.news = data;
        console.log("🚀 ~ NewsComponent ~ this.news:", this.news)

      });
    });
  }
}
