import { useState, useEffect } from "react";
import BlogCard from "../feed/BlogCard";
import axiosInstance from "../../utils/axoisInstance";
import { Link } from "react-router-dom";

const MyLikedPost = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/blogs");
        setBlogs(response.data?.data);
        console.log(response?.data?.data[0]);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-7xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => (
          <Link to={`/blogs/${blog._id}`} key={blog._id}>
            <BlogCard
              title={blog.title}
              description={blog.description}
              createdBy={blog.createdBy.firstname || "Unknown"}
              createdAt={blog.createdAt}
              likes={blog.likedBy.length}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyLikedPost;
