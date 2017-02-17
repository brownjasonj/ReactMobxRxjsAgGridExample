import { observable } from 'mobx';

class Post {
    @observable public id: string;
    @observable public title: string;
    @observable public categories: string;

    constructor(id: string, title: string, categories: string) {
        this.id = id;
        this.title = title;
        this.categories = categories;
    }
}

class PostsState {
    @observable private _posts: Post[];

    get posts() { return this._posts;}

    set posts(posts: Post[]) { this._posts=posts ;}

	addPost(post: Post) {
		this._posts.push(post);
	}

    constructor() {
        this._posts = [];
    }
}

const postsstate : PostsState = new PostsState();

export { PostsState, Post, postsstate }
