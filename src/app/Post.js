import React, {Component} from 'react';
import {Card, Grid, Image} from 'semantic-ui-react'
import {observer} from 'mobx-react';
import { Divider } from 'semantic-ui-react'

const Post = observer(class Post extends Component {
  render() {
    const {postsByDay, StringifiedSelectedDay} = this.props.postStore
    const posts = postsByDay[StringifiedSelectedDay]
    if (!posts) {
      return null;
    }
    const parsedPosts = posts.map((post, index) => <Grid.Column key={index}>
      <Card centered>
        {!!post.photoUrls
          ? post
            .photoUrls
            .map((photoUrl, index) => <Image src={photoUrl} key={index}/>)
          : null}
        <Card.Content>
          <Card.Header>{post.writter}</Card.Header>
          <Card.Meta>{post
              .date
              .toDateString()}</Card.Meta>
          <Card.Description>{post.text}</Card.Description>
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
        <Divider horizontal>{StringifiedSelectedDay}</Divider>
        <Grid columns={4} stackable>
          {parsedPosts}
        </Grid>
      </div>
    );
  }
})

export default Post;