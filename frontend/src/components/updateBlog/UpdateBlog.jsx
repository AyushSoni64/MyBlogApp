import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axoisInstance";
import { useToastContext } from "../../context/ToastContext";

const UpdateBlog = () => {
  const { blogId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showSuccess } = useToastContext();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosInstance.get(`/blogs/${blogId}`);
        const blog = response.data?.data;
        setTitle(blog.title);
        setDescription(blog.description);
      } catch (error) {
        console.error("Error fetching blog", error);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/blogs/${blogId}`, {
        title,
        description,
      });
      if (response.status === 200) {
        showSuccess("Blog updated successfully");
        navigate("/blogs");
      } else {
        console.log("Not able to update post");
      }
    } catch (error) {
      setError("Error updating post");
      console.error("Error updating post", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 pt-20 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6">Update Post</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-600"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
