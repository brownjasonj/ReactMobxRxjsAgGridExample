import * as React from 'react';
import { Link } from 'react-router';

import { BlogPostsService } from '../services/blogposts.service';

class PostsIndex extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link to="/posts" className="btn btn-primary">
                        Add a Post
                    </Link>
                </div>
            Posts page!
            </div>  
        );
    }
}

export { PostsIndex }
