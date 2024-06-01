import { useState, useEffect } from "react";
import BlogCard from "../feed/BlogCard";
import axiosInstance from "../../utils/axoisInstance";

const MyLikedPost = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const userId = localStorage.getItem("user");
        const user = JSON.parse(userId);
        if (!userId) throw new Error("User ID not found in localStorage");
        const response = await axiosInstance.get(`/user/${user._id}/liked`);
        setBlogs(response.data?.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleUnlike = (blogId) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h3 className="text-center text-5xl mt-5 mb-8">My Liked Blogs</h3>
      {blogs.length === 0 ? (
        <div className="text-center text-gray-600">
          You don&apos;t have any liked blogs
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {blogs?.map((blog) => (
            <div key={blog._id}>
              <BlogCard
                isLiked={true}
                picture={blog.picture}
                title={blog.title}
                description={blog.description}
                createdBy={blog.createdBy.firstname || "Unknown"}
                createdAt={blog.createdAt}
                likes={blog.likedBy.length}
                blogId={blog._id}
                onUnlike={handleUnlike}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLikedPost;
