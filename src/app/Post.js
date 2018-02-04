import React, {Component} from 'react';
import {Card, Image} from 'semantic-ui-react'
import {observer} from 'mobx-react';
import {Divider, Icon} from 'semantic-ui-react'
import Masonry from './Masonry'
import _ from 'partial-js';

@observer
class Post extends Component {
  render() {
    const {postsByDate, stringifiedSelectedDay} = this.props.postsState
    if (!(stringifiedSelectedDay in postsByDate)) {
      return null;
    }
    const posts = postsByDate[stringifiedSelectedDay]
    const parsedPosts = _.map(posts, (post, index) => 
        <CardWrapper
          style={CardWrapperStyle}
          key={index}
        >
          <Card centered className={`animated fadeIn`}>
            {
              _.map(_.keys(post.photoUrls), (id, index) => 
                <ImageWrapper
                  style={ImageWrapperStyle}
                  key={index}
                >
                  <Image src={post.photoUrls[id]} />
                </ImageWrapper>
              )
            }
            <Card.Content>
              <Card.Header>
                {post.text}
              </Card.Header>
              <Icon
                name='remove'
                onClick={e => this.props.deletePost(post)}/>
              <Card.Meta>
                {post.date.toLocaleDateString()}
              </Card.Meta>
              <Card.Description>
                {post.userInfo.displayName}
              </Card.Description>
            </Card.Content>
          </Card>
        </CardWrapper>
    );
    return (
      <div className="Post" ref="Post">
        <Divider horizontal>{stringifiedSelectedDay}</Divider>
        <Masonry>
          {parsedPosts}
        </Masonry>
      </div>
    );
  }
}

const ImageWrapper = ({style, children}) => (
  <div
    style={style}
  >
    {children}
  </div>
)

const ImageWrapperStyle = {
  margin: "1rem",
  align: "center",
  textAlign: "center",
}

const CardWrapper = ({style, children}) => (
  <div
    style={style}
  >
    {children}
  </div>
)

const CardWrapperStyle = {
  margin: "10px",
  align: "center",
  textAlign: "center",
}

export default Post;