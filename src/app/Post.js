import React, {Component} from 'react';
import {Card, Image} from 'semantic-ui-react'
import {observer} from 'mobx-react';
import {Divider, Icon} from 'semantic-ui-react'
import Masonry from './Masonry'

@observer
class Post extends Component {
  render() {
    const {postsByDate, stringifiedSelectedDay} = this.props.postsState
    if (!(stringifiedSelectedDay in postsByDate)) {
      return null;
    }
    const posts = postsByDate[stringifiedSelectedDay]
    const parsedPosts = []
    const { innerWidth } = window;
    const brakePoints = innerWidth < 768? [] : innerWidth < 1000? [innerWidth/2] : innerWidth < 1200? [innerWidth/3,innerWidth*2/3,] : [innerWidth/4,innerWidth/2,innerWidth*3/4]
    posts.map((post, index) => {
      parsedPosts.push(
        <CardWrapper
          style={CardWrapperStyle}
          key={index}
        >
          <Card centered className={`animated fadeIn`}>
            {!!post.photoUrls
              ? Object
                .keys(post.photoUrls)
                .map((id, index) => 
                <ImageWrapper
                  style={ImageWrapperStyle}
                  key={index}
                >
                </ImageWrapper>
                )
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
                {post.userInfo.displayName}
              </Card.Description>
            </Card.Content>
          </Card>
        </CardWrapper>
      )
      return null;
    });
    return (
      <div className="Post" ref="Post">
        <Divider horizontal>{stringifiedSelectedDay}</Divider>
        <Masonry 
          brakePoints={brakePoints}
        >
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