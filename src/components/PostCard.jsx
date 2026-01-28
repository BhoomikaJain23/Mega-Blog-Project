import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        
        {featuredimage && (
          <div className="w-full h-56 overflow-hidden">
            <img
              src={appwriteService.getFilepreview(featuredimage)}
              alt={title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {title}
          </h2>
        </div>

      </div>
    </Link>
  );
}


export default PostCard;
