import * as React from 'react';
import { observer } from 'mobx-react';
 
import { Post } from '../state/posts.state';

@observer
class PostItem extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const post: Post = this.props.post;
        return (
            <li>
                Title : { post.title };
                Categories : { post.categories }
            </li>
        );
    }
}

export { PostItem }