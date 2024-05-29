import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import axiosInstance from "../../utils/axoisInstance";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("picture", picture);
    try {
      const response = await axiosInstance.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        navigate("/blogs");
      } else {
        console.log("Not able to create post");
      }
    } catch (error) {
      setError("Error creating post");
      console.error("Error creating post", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 pt-20 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
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
          <div className="mb-4">
            <label
              className="block text-lg font-medium text-gray-700 mb-2"
              htmlFor="image"
            >
              Upload Image
            </label>
            <div className="flex items-center">
              <label className="cursor-pointer bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-center">
                <FaUpload className="mr-2" />
                <span className="text-base font-medium">Choose File</span>
                <input
                  id="image"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              {picture && (
                <span className="ml-4 text-gray-700">{picture.name}</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-600"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
