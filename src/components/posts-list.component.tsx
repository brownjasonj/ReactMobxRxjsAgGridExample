import * as React from 'react';
import { observable } from 'mobx';
import { observer, inject } from 'mobx-react';

import { PostItem } from './post-item.component';
import { PostsState, Post  } from '../state/posts.state';

import { BlogPostsService } from '../services/blogposts.service';

interface Props {
    postsState : PostsState
}

@observer
class PostsList extends React.Component<Props, {}> {
    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        const bps : BlogPostsService = new BlogPostsService();

        bps.getPosts().subscribe(
            (data : any) => {
                if (data.response.statusCode === 200) {
                    this.props.postsState.posts = data.body;

                    //data.body.map((post : Post) => this.props.postsState.addPost(post));

                }
            },
            (err : string) => console.error(err) // Show error in console 
            );
    }

    render() {

        const posts =  this.props.postsState.posts.map((post) => {
            return (
                <PostItem 
                    post={post}
                    key={post.id}/>
            )
        });

        return (
            <ul className="col-md-4 list-group">
            {posts}
            </ul>
        );
    }
}

export { PostsList };