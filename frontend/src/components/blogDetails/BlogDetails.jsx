import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa";
import axiosInstance from "../../utils/axoisInstance";

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blogs/${blogId}`);
        setBlog(response.data.data);
      } catch (error) {
        setError("Error fetching blog details");
        console.error("Error fetching blog details", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!blog) return <p>Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-4 pt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img
          className="w-full h-96 object-cover"
          src={blog.picture}
          alt={blog.title}
        />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="text-gray-700 text-base mb-4">{blog.description}</p>
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-600 text-sm">
              <p>Created by: {blog.createdBy.firstname || "Unknown"}</p>
              <p>Created on: {new Date(blog.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <FaRegThumbsUp className="mr-1" />
              <span>{blog.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
