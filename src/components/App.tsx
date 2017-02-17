import * as React from 'react'
import { observer, inject } from 'mobx-react';

import { BlogPostsService } from '../services/blogposts.service';

import { PostsState, Post } from '../state/posts.state';

import { PostsList } from './posts-list.component';

interface Props {
    store : PostsState;
};

@inject("store")
class App extends React.Component<any, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <PostsList postsState={this.props.store}/>
        );
    }
}

export { App };