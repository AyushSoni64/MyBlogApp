// import { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";
// import { FaUpload } from "react-icons/fa";
// import axiosInstance from "../../utils/axoisInstance";
// import { useToastContext } from "../../context/ToastContext";

// const CreatePost = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [picture, setPicture] = useState(null);
//   const [error, setError] = useState("");
//   const [isFormValid, setIsFormValid] = useState(false);

//   const navigate = useNavigate();
//   const { showSuccess } = useToastContext();

//   useEffect(() => {
//     validateForm();
//   }, [title, description, picture]);

//   const validateForm = () => {
//     const titleWords = title.trim().split(/\s+/).length;
//     const descriptionWords = description.trim().split(/\s+/).length;
//     const isTitleValid = titleWords >= 2 && titleWords <= 50;
//     const isDescriptionValid = descriptionWords >= 5 && descriptionWords <= 200;
//     const isPictureValid =
//       picture &&
//       ["image/png", "image/jpeg", "image/jpg"].includes(picture.type);

//     setIsFormValid(isTitleValid && isDescriptionValid && isPictureValid);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && ["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
//       setPicture(file);
//       setError("");
//     } else {
//       setPicture(null);
//       setError("Please upload a valid image file (png, jpg, jpeg)");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("picture", picture);
//     try {
//       const response = await axiosInstance.post("/blogs", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       if (response.status === 200) {
//         showSuccess("Blog created successfully!");
//         navigate("/blogs");
//       } else {
//         console.log("Not able to create post");
//       }
//     } catch (error) {
//       setError("Error creating post");
//       console.error("Error creating post", error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-4 pt-20 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
//         <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               className="block text-lg font-medium text-gray-700 mb-2"
//               htmlFor="title"
//             >
//               Title
//             </label>
//             <input
//               id="title"
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-lg font-medium text-gray-700 mb-2"
//               htmlFor="description"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-lg font-medium text-gray-700 mb-2"
//               htmlFor="image"
//             >
//               Upload Image
//             </label>
//             <div className="flex items-center">
//               <label className="cursor-pointer bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-center">
//                 <FaUpload className="mr-2" />
//                 <span className="text-base font-medium">Choose File</span>
//                 <input
//                   id="image"
//                   type="file"
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//               </label>
//               {picture && (
//                 <span className="ml-4 text-gray-700">{picture.name}</span>
//               )}
//             </div>
//           </div>
//           {/* <button
//             type="submit"
//             className="w-full p-3 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-600"
//           >
//             Create Post
//           </button> */}
//           <button
//             type="submit"
//             className={`w-full p-3 text-white text-lg font-medium rounded-lg ${
//               isFormValid
//                 ? "bg-blue-500 hover:bg-blue-600"
//                 : "bg-gray-300 cursor-not-allowed"
//             }`}
//             disabled={!isFormValid}
//           >
//             Create Post
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUpload } from "react-icons/fa";
// import axiosInstance from "../../utils/axoisInstance";
// import { useToastContext } from "../../context/ToastContext";

// const CreatePost = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [picture, setPicture] = useState(null);
//   const [error, setError] = useState("");
//   const [isFormValid, setIsFormValid] = useState(false);

//   const navigate = useNavigate();
//   const { showSuccess } = useToastContext();

//   useEffect(() => {
//     validateForm();
//   }, [title, description, picture]);

//   const validateForm = () => {
//     const titleWords = title.trim().split(/\s+/).length;
//     const descriptionWords = description.trim().split(/\s+/).length;
//     const isTitleValid = titleWords >= 2 && titleWords <= 50;
//     const isDescriptionValid = descriptionWords >= 5 && descriptionWords <= 200;
//     const isPictureValid =
//       picture &&
//       ["image/png", "image/jpeg", "image/jpg"].includes(picture.type);

//     setIsFormValid(isTitleValid && isDescriptionValid && isPictureValid);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && ["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
//       setPicture(file);
//       setError("");
//     } else {
//       setPicture(null);
//       setError("Please upload a valid image file (png, jpg, jpeg)");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("picture", picture);
//     try {
//       const response = await axiosInstance.post("/blogs", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       if (response.status === 200) {
//         showSuccess("Blog created successfully!");
//         navigate("/blogs");
//       } else {
//         console.log("Not able to create post");
//       }
//     } catch (error) {
//       setError("Error creating post");
//       console.error("Error creating post", error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-4 pt-20 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
//         <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               className="block text-lg font-medium text-gray-700 mb-2"
//               htmlFor="title"
//             >
//               Title
//             </label>
//             <input
//               id="title"
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//             <p className="text-sm text-gray-600">
//               {title.trim().split(/\s+/).length} / 50 words
//             </p>
//             {title.trim().split(/\s+/).length < 2 && (
//               <p className="text-red-500 text-sm">Title must be at least 2 words</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-lg font-medium text-gray-700 mb-2"
//               htmlFor="description"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             ></textarea>
//             <p className="text-sm text-gray-600">
//               {description.trim().split(/\s+/).length} / 200 words
//             </p>
//             {(description.trim().split(/\s+/).length < 5 ||
//               description.trim().split(/\s+/).length > 200) && (
//               <p className="text-red-500 text-sm">
//                 Description must be between 5 and 200 words
//               </p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-lg font-medium text-gray-700 mb-2"
//               htmlFor="image"
//             >
//               Upload Image
//             </label>
//             <div className="flex items-center">
//               <label className="cursor-pointer bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-center">
//                 <FaUpload className="mr-2" />
//                 <span className="text-base font-medium">Choose File</span>
//                 <input
//                   id="image"
//                   type="file"
//                   className="hidden"
//                   onChange={handleImageChange}
//                 />
//               </label>
//               {picture && (
//                 <span className="ml-4 text-gray-700">{picture.name}</span>
//               )}
//             </div>
//             {!picture && error && (
//               <p className="text-red-500 text-sm">{error}</p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className={`w-full p-3 text-white text-lg font-medium rounded-lg ${
//               isFormValid
//                 ? "bg-blue-500 hover:bg-blue-600"
//                 : "bg-gray-300 cursor-not-allowed"
//             }`}
//             disabled={!isFormValid}
//           >
//             Create Post
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUpload } from "react-icons/fa";
// import axiosInstance from "../../utils/axoisInstance";
// import { useToastContext } from "../../context/ToastContext";

// const CreatePost = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [picture, setPicture] = useState(null);
//   const [error, setError] = useState("");
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [imagePreview, setImagePreview] = useState("");
//   const [titleTouched, setTitleTouched] = useState(false);
//   const [descriptionTouched, setDescriptionTouched] = useState(false);
//   const [pictureTouched, setPictureTouched] = useState(false);

//   const navigate = useNavigate();
//   const { showSuccess } = useToastContext();

//   useEffect(() => {
//     validateForm();
//   }, [title, description, picture]);

//   const validateForm = () => {
//     const titleWords = title.trim().split(/\s+/).length;
//     const descriptionWords = description.trim().split(/\s+/).length;
//     const isTitleValid = titleWords >= 2 && titleWords <= 50;
//     const isDescriptionValid = descriptionWords >= 5 && descriptionWords <= 200;
//     const isPictureValid =
//       picture &&
//       ["image/png", "image/jpeg", "image/jpg"].includes(picture.type);

//     setIsFormValid(isTitleValid && isDescriptionValid && isPictureValid);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && ["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
//       setPicture(file);
//       setImagePreview(URL.createObjectURL(file));
//       setError("");
//     } else {
//       setPicture(null);
//       setImagePreview("");
//       setError("Please upload a valid image file (png, jpg, jpeg)");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("picture", picture);
//     try {
//       const response = await axiosInstance.post("/blogs", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       if (response.status === 200) {
//         showSuccess("Blog created successfully!");
//         navigate("/blogs");
//       } else {
//         console.log("Not able to create post");
//       }
//     } catch (error) {
//       setError("Error creating post");
//       console.error("Error creating post", error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen p-4 pt-20 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
//         <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               className="block text-lg font-medium text-gray-700 mb-2"
//               htmlFor="title"
//             >
//               Title
//             </label>
//             <input
//               id="title"
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               onBlur={() => setTitleTouched(true)}
//               required
//             />
//             <p className="text-sm text-gray-600">
//               {title.trim().split(/\s+/).length} / 50 words
//             </p>
//             {titleTouched && title.trim().split(/\s+/).length < 2 && (
//               <p className="text-red-500 text-sm">Title must be at least 2 words</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-lg font-medium text-gray-700 mb-2"
//               htmlFor="description"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               className="w-full p-3 border border-gray-300 rounded-lg"
//               rows={6}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               onBlur={() => setDescriptionTouched(true)}
//               required
//               style={{ resize: "none" }}
//             ></textarea>
//             <p className="text-sm text-gray-600">
//               {description.trim().split(/\s+/).length} / 200 words
//             </p>
//             {descriptionTouched && description.trim().split(/\s+/).length < 5 && (
//               <p className="text-red-500 text-sm">Description must be at least 5 words</p>
//             )}
//           </div>
//           <div className="mb-4">
//             <label
//               className="block text-lg font-medium text-gray-700 mb-2"
//               htmlFor="image"
//             >
//               Upload Image
//             </label>
//             <div className="flex items-center">
//               <label className="cursor-pointer bg-gray-200 text-gray-700 p-3 rounded-lg flex items-center justify-center">
//                 <FaUpload className="mr-2" />
//                 <span className="text-base font-medium">Choose File</span>
//                 <input
//                   id="image"
//                   type="file"
//                   className="hidden"
//                   onChange={handleImageChange}
//                   onBlur={() => setPictureTouched(true)}
//                 />
//               </label>
//               {picture && (
//                 <span className="ml-4 text-gray-700">{picture.name}</span>
//               )}
//             </div>
//             {pictureTouched && !picture && (
//               <p className="text-red-500 text-sm">Please upload a valid image file (png, jpg, jpeg)</p>
//             )}
//             {imagePreview && (
//               <div className="mt-4">
//                 <img src={imagePreview} alt="Preview" className="w-36 h-auto max-h-64 object-cover rounded-lg" />
//               </div>
//             )}
//           </div>
//           <button
//             type="submit"
//             className={`w-full p-3 text-white text-lg font-medium rounded-lg ${
//               isFormValid
//                 ? "bg-blue-500 hover:bg-blue-600"
//                 : "bg-gray-300 cursor-not-allowed"
//             }`}
//             disabled={!isFormValid}
//           >
//             Create Post
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import axiosInstance from "../../utils/axoisInstance";
import { useToastContext } from "../../context/ToastContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const [descriptionTouched, setDescriptionTouched] = useState(false);
  const [pictureTouched, setPictureTouched] = useState(false);

  const navigate = useNavigate();
  const { showSuccess } = useToastContext();

  useEffect(() => {
    validateForm();
  }, [title, description, picture]);

  const validateForm = () => {
    const titleWords = title.trim().split(/\s+/).length;
    const descriptionWords = description.trim().split(/\s+/).length;
    const isTitleValid = titleWords >= 2 && titleWords <= 50;
    const isDescriptionValid = descriptionWords >= 5 && descriptionWords <= 200;
    const isPictureValid =
      picture &&
      ["image/png", "image/jpeg", "image/jpg"].includes(picture.type);

    setIsFormValid(isTitleValid && isDescriptionValid && isPictureValid);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      setPicture(file);
      setImagePreview(URL.createObjectURL(file));
      setError("");
    } else {
      setPicture(null);
      setImagePreview("");
      setError("Please upload a valid image file (png, jpg, jpeg)");
    }
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
        showSuccess("Blog created successfully!");
        navigate("/blogs");
      } else {
        console.log("Not able to create post");
      }
    } catch (error) {
      setError("Error creating post");
      console.error("Error creating post", error);
    }
  };

  const getTitleWordCountClass = () => {
    const wordCount = title.trim().split(/\s+/).length;
    return wordCount > 50 ? "text-red-500" : "text-gray-600";
  };

  const getDescriptionWordCountClass = () => {
    const wordCount = description.trim().split(/\s+/).length;
    return wordCount > 200 ? "text-red-500" : "text-gray-600";
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 pt-20 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl w-full">
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
              onBlur={() => setTitleTouched(true)}
              required
            />
            <p className={`text-sm ${getTitleWordCountClass()}`}>
              {title.trim().split(/\s+/).length} / 50 words
            </p>
            {titleTouched && title.trim().split(/\s+/).length < 2 && (
              <p className="text-red-500 text-sm">
                Title must be at least 2 words
              </p>
            )}
            {titleTouched && title.trim().split(/\s+/).length > 50 && (
              <p className="text-red-500 text-sm">
                Title must not exceed 50 words
              </p>
            )}
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
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setDescriptionTouched(true)}
              required
              style={{ resize: "none" }}
            ></textarea>
            <p className={`text-sm ${getDescriptionWordCountClass()}`}>
              {description.trim().split(/\s+/).length} / 200 words
            </p>
            {descriptionTouched &&
              description.trim().split(/\s+/).length < 5 && (
                <p className="text-red-500 text-sm">
                  Description must be at least 5 words
                </p>
              )}
            {descriptionTouched &&
              description.trim().split(/\s+/).length > 200 && (
                <p className="text-red-500 text-sm">
                  Description must not exceed 200 words
                </p>
              )}
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
                  onBlur={() => setPictureTouched(true)}
                />
              </label>
              {picture && (
                <span className="ml-4 text-gray-700">{picture.name}</span>
              )}
            </div>
            {pictureTouched && !picture && (
              <p className="text-red-500 text-sm">
                Please upload a valid image file (png, jpg, jpeg)
              </p>
            )}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-36 h-auto max-h-64 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`w-full p-3 text-white text-lg font-medium rounded-lg ${
              isFormValid
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
