import React from 'react'

const PostCard = ({post,loading}) => {
    if(loading){
        return <h2>Loading...</h2>
    }
  return <ul>

    {post.map((post) => (
      <li key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </li>
    ))}
    
  </ul>
}

export default PostCard