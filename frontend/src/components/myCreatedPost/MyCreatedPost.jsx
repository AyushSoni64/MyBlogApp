import { useState, useEffect } from "react";
import BlogCard from "../feed/BlogCard";
import axiosInstance from "../../utils/axoisInstance";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../genericComponent/Modal";
import { useAuth } from "../../context/AuthContext";
import { useToastContext } from "../../context/ToastContext";

const MyCreatedPost = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const { user } = useAuth();
  const { showSuccess } = useToastContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const userId = localStorage.getItem("user");
        const user = JSON.parse(userId);
        if (!userId) throw new Error("User ID not found in localStorage");
        const response = await axiosInstance.get(`/user/${user._id}/blogs`);
        setBlogs(response.data?.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      await axiosInstance.delete(`/blogs/${blogId}`);
      showSuccess("Blog deleted Successfully!");
      setBlogs(blogs.filter((blog) => blog._id !== selectedBlogId));
      setShowModal(false);
      setSelectedBlogId(null);
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  const handleUpdate = (blogId) => {
    navigate(`/update-blog/${blogId}`);
  };

  const openModal = (blogId) => {
    setSelectedBlogId(blogId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBlogId(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {blogs.length === 0 ? (
        <div className="text-center text-gray-600">
          You don&apos;t have any created blogs
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {blogs?.map((blog) => (
            <div key={blog._id} className="relative">
              <Link to={`/blogs/${blog._id}`} key={blog._id}>
                <BlogCard
                  picture={blog.picture}
                  title={blog.title}
                  description={blog.description}
                  createdBy={blog.createdBy.firstname || "Unknown"}
                  createdAt={blog.createdAt}
                  likes={blog.likedBy.length}
                  isLiked={blog.likedBy.includes(user._id)}
                />
              </Link>
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                  onClick={() => handleUpdate(blog._id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  onClick={() => openModal(blog._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal
        show={showModal}
        onConfirm={() => handleDelete(selectedBlogId)}
        onCancel={closeModal}
      />
    </div>
  );
};

export default MyCreatedPost;
