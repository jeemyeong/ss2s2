import React, {Component} from 'react';
import {Card, Grid, Image} from 'semantic-ui-react'
import {observer} from 'mobx-react';
import {Divider, Icon} from 'semantic-ui-react'

@observer
class Post extends Component {
  render() {
    const {postsByDate, stringifiedSelectedDay} = this.props.postsState
    if (!(stringifiedSelectedDay in postsByDate)) {
      return null;
    }
    const posts = postsByDate[stringifiedSelectedDay]
    const parsedPosts = posts.map((post, index) => <Grid.Column key={index}>
      <Card centered className={`animated fadeIn`}>
        {!!post.photoUrls
          ? Object
            .keys(post.photoUrls)
            .map((id, index) => <Image src={post.photoUrls[id]} key={index}/>)
          : null}
        <Card.Content>
          <Card.Header>
            {post.text}
          </Card.Header>
          <Icon
            name='remove'
            onClick={e => this
            .props
            .deletePost(post)}/>
          <Card.Meta>{post
              .date
              .toLocaleDateString()}</Card.Meta>
          <Card.Description>
            <Image src={post.userInfo.photoURL} avatar />
            {post.userInfo.displayName}
          </Card.Description>
        </Card.Content>
        {/* <Card.Content extra>
            <a>
              <Icon name='user' />
              10 Friends
            </a>
          </Card.Content> */}
      </Card>
    </Grid.Column>);
    return (
      <div className="Post">
        <Divider horizontal>{stringifiedSelectedDay}</Divider>
        <Grid columns={4} stackable>
          {parsedPosts}
        </Grid>
      </div>
    );
  }
}

export default Post;