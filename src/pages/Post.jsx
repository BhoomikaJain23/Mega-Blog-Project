import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData?.userData ? post.userId === userData.userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((p) => {
        if (p) setPost(p);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        if (post.featuredimage) appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    }).catch(() => alert("You are not allowed to delete this post"));
  };

  return post ? (
    <div className="py-12">
      <Container>
        <div className="w-full mb-6 relative border border-slate-700 rounded-2xl p-4 glass">
          {post.featuredimage && (
            <img src={appwriteService.getFilepreview(post.featuredimage)} alt={post.title} className="rounded-xl w-full max-h-96 object-cover" />
          )}

          {isAuthor && (
            <div className="absolute right-6 top-6 flex gap-3">
              <Link to={`/edit-post/${post.$id}`}><Button> Edit </Button></Link>
              <Button bgColor="bg-red-600" onClick={deletePost}> Delete </Button>
            </div>
          )}
        </div>

        <h1 className="text-4xl font-extrabold text-slate-100 mb-6">{post.title}</h1>

        <div className="browser-css prose prose-invert">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}