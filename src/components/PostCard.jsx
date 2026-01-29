import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="rounded-xl card-glow overflow-hidden transition group bg-slate-800/40 border border-slate-700 hover:border-sky-400/60 hover:shadow-2xl">
        {featuredimage && (
          <div className="w-full h-56 overflow-hidden relative">
            <img
              src={appwriteService.getFilepreview(featuredimage)}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        )}

        <div className="p-5 bg-gradient-to-b from-transparent to-slate-900/20">
          <h2 className="text-lg font-semibold text-slate-100 group-hover:text-sky-300 transition-colors line-clamp-2">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;