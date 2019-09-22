import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
import { PostService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = '';

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content).subscribe(() => {
      this.fetchPosts();
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.deletePosts().subscribe(response => {
      this.loadedPosts = [];
      this.isFetching = false;
    });
  }

  fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.loadedPosts = posts;
      this.isFetching = false;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onErrorHandled() {
    this.error = '';
  }

}
