import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (userData) {
      appwriteService.getPosts().then((posts) => {
        if (posts) setPosts(posts.documents);
      });
    } else {
      setPosts([]);
    }
  }, [userData]);

  if (posts.length === 0) {
    return (
      <div className="w-full py-20 text-center">
        <Container>
          <h1 className="text-4xl font-extrabold text-slate-100">Login to read posts</h1>
          <p className="mt-4 text-slate-300">Create and explore futuristic posts.</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => <PostCard key={post.$id} {...post} />)}
        </div>
      </Container>
    </div>
  );
}

export default Home;