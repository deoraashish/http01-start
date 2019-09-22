import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
    return this.http.post<{ [key: string]: Post }>('https://ng-complete-guide-baf2d.firebaseio.com/posts.json', post,
    {
      observe: 'response'
    });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-baf2d.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({ 'Custom-Header': 'Hello' }),
        params: searchParams,
        responseType: 'json'
      }
    )
    .pipe(
      map(responseData => {
      const postsArray: Post[] = [];
      console.log(responseData);
      // responseData = responseData.body;
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
