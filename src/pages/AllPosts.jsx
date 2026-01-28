import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);

 useEffect(() => {
  appwriteService.getPosts().then((posts) => {
    console.log("POSTS FROM APPWRITE ", posts.documents);

    if (posts) {
      setPosts(posts.documents);
    }
  }).catch((err) => {
    console.error("ERROR FROM APPWRITE ", err);
  });
}, []);


  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
  <div key={post.$id} className="p-2 w-1/4">
    <PostCard 
      $id={post.$id} 
      title={post.title} 
      featuredimage={post.featuredimage}  // lowercase, as in your Appwrite
    />
  </div>
))}

        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
