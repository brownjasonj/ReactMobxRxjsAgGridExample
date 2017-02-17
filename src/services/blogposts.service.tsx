import * as React from 'react';
import { Observable } from 'rxjs';
import { RxHttpRequest } from 'rx-http-request';


const API_KEY: string = "?key=123abcdefgh";
const ROOT_URL: string = `http://reduxblog.herokuapp.com/api`;

interface BlogPost {
    id: string;
    title: string;
    categories: string;
}

class BlogPostsService {

    constructor() {

    }

    getPosts() {
        return RxHttpRequest.get(`${ROOT_URL}/posts?${API_KEY}`, {json: true});
    }

}

export { BlogPost, BlogPostsService }