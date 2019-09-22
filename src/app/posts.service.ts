import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const post: Post = {title, content};
    post.title = title;
    post.content = content;
    return this.http.post<{ [key: string]: Post }>('https://ng-complete-guide-baf2d.firebaseio.com/posts.json', post);
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-baf2d.firebaseio.com/posts.json')
    .pipe(
      map(responseData => {
      const postsArray: Post[] = [];
      // console.log(responseData);
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({ ...responseData[key], id: key });
        }
      }
      return postsArray;
    })
    );
  }

  deletePosts() {
    return this.http.delete('https://ng-complete-guide-baf2d.firebaseio.com/posts.json');
  }
}
