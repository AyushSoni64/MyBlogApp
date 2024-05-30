// import { useState, useEffect } from "react";
// import BlogCard from "./BlogCard";
// import axiosInstance from "../../utils/axoisInstance";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const Feed = () => {
//   const [blogs, setBlogs] = useState([]);
//   const { user } = useAuth();
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axiosInstance.get("/blogs");
//         setBlogs(response.data?.data);
//         console.log(response.data.data);
//       } catch (error) {
//         console.error("Error fetching blogs", error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       <div className="max-w-7xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {blogs?.map((blog) => (
//           <Link to={`/blogs/${blog._id}`} key={blog._id}>
//             <BlogCard
//               title={blog.title}
//               description={blog.description}
//               picture={blog.picture}
//               createdBy={blog.createdBy.firstname || "Unknown"}
//               createdAt={blog.createdAt}
//               likes={blog.likedBy.length}
//               blogId={blog._id}
//               isLiked={(user) ? blog.likedBy.includes(user._id) : false}
//             />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;

// import { useState, useEffect } from "react";
// import BlogCard from "./BlogCard";
// import axiosInstance from "../../utils/axoisInstance";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const Feed = () => {
//   const [blogs, setBlogs] = useState([]);
//   const { user } = useAuth();

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await axiosInstance.get("/blogs");
//         setBlogs(response.data?.data);
//         console.log(response.data.data);
//       } catch (error) {
//         console.error("Error fetching blogs", error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   return (
//     <div className="bg-gray-100 min-h-screen p-4">
//       <div className="max-w-7xl mx-auto">
//         {blogs?.map((blog) => (
//           <Link to={`/blogs/${blog._id}`} key={blog._id} className="block">
//             <BlogCard
//               title={blog.title}
//               description={blog.description}
//               picture={blog.picture}
//               createdBy={blog.createdBy.firstname || "Unknown"}
//               createdAt={blog.createdAt}
//               likes={blog.likedBy.length}
//               blogId={blog._id}
//               isLiked={(user) ? blog.likedBy.includes(user._id) : false}
//             />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Feed;


import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import axiosInstance from "../../utils/axoisInstance";
import { useAuth } from "../../context/AuthContext";

const Feed = () => {
  const [blogs, setBlogs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/blogs");
        setBlogs(response.data?.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {blogs?.map((blog) => (
          <div key={blog._id}>
            <BlogCard
              title={blog.title}
              description={blog.description}
              picture={blog.picture}
              createdBy={blog.createdBy.firstname || "Unknown"}
              createdAt={blog.createdAt}
              likes={blog.likedBy.length}
              blogId={blog._id}
              isLiked={(user) ? blog.likedBy.includes(user._id) : false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
