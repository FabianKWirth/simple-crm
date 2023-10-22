import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from 'src/models/article.class';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.scss']
})
export class NewsFeedComponent implements OnInit {
  NEWS_API_KEY: string = "b11e68fcb31f459daf3cf05d37bbf765";
  apiUrl: string = 'https://newsapi.org/v2/top-headlines';

  articles:Article[];

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  ngOnInit() {
    this.getNews();
  }

  getNews() {
    const params = {
      apiKey: this.NEWS_API_KEY,
      sources: 'bbc-news,the-verge',
      language: 'en'
    };

    this.http.get(this.apiUrl, { params }).subscribe(response => {
      console.log(response["articles"]);
      this.articles=response["articles"];
      
    });
  }
  formatDate(date: string): string {
    const dateObject = new Date(date);
    return this.datePipe.transform(dateObject, 'd.M.y H:mm');
  }
}
