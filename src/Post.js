import React, { Component } from 'react';

class Post extends Component {
  render() {
    const { posts } = this.props;
    if (!posts){
      return null;
    }
    const parsedPosts = posts.map((post, index)=>
      <ul key={index}>
        <li>
          date: {post.date.toDateString()}
        </li>
        <li>
          text: {post.text}
        </li>
        <li>
          photoUrls: {post.photoUrls.map((photoUrl, index) =>
            <img src={photoUrl} alt="photoUrl" key={index}/>
          )}
        </li>
        <li>
          writter: {post.writter}
        </li>
      </ul>
    );
    return (
      <div>
        {parsedPosts}
      </div>
    );
  }
}

export default Post;