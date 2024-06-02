import React, { useState, useEffect } from 'react';

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(data.slice(0, 5));
    }
    loadData();
  }, []);

  function PostList(props) {
    return (
      <ul>
        {props.posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    );
  }
  function loadNextPosts() {
    setCurrentIndex(currentIndex + 5);
    async function loadData() {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await response.json();
      setPosts(posts.concat(data.slice(currentIndex, currentIndex + 5)));
    }
    loadData();
  }

  return (
    <div>
      <PostList posts={posts} />
      <button onClick={loadNextPosts}>Load more posts</button>
    </div>
  );
}

export default BlogPosts;
