// import { useState, useEffect } from "react";
// import BlogCard from "./BlogCard";
// import axiosInstance from "../../utils/axoisInstance";
// import { useAuth } from "../../context/AuthContext";

// const Feed = () => {
//   const [blogs, setBlogs] = useState([]);
//   const { user } = useAuth();
//   const fetchBlogs = async () => {
//     try {
//       const response = await axiosInstance.get("/blogs");
//       if (response.status === 200) {
//         setBlogs(response.data?.data);
//       }
//     } catch (error) {
//       console.error("Error fetching blogs", error);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   if (!blogs || blogs.length === 0) {
//     return <div>NO BLOGS FOUND</div>;
//   }
//   return (
//     <div className="bg-gray-200 min-h-screen p-4">
//       <div className="max-w-7xl mx-auto">
//         {blogs?.map((blog) => (
//           <div key={blog._id} className="mt-9">
//             <BlogCard
//               title={blog.title}
//               description={blog.description}
//               picture={blog.picture}
//               createdBy={blog.createdBy.firstname || "Unknown"}
//               createdAt={blog.createdAt}
//               likes={blog.likedBy.length}
//               blogId={blog._id}
//               isLiked={user ? blog.likedBy.includes(user._id) : false}
//             />
//           </div>
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
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material"; // For loader

const Feed = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useAuth();

  const fetchBlogs = async (pageNum = 1) => {
    try {
      const limit = 5; // Number of blogs to fetch per request
      const response = await axiosInstance.get("/blogs", {
        params: { page: pageNum, limit },
      });
      if (response.status === 200) {
        const newBlogs = response.data?.data;
        setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
        if (newBlogs.length < limit) {
          setHasMore(false); // No more blogs to fetch
        }
        setPage(pageNum + 1);
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Initial fetch
  }, []);

  if (!blogs || blogs.length === 0) {
    return <div>NO BLOGS FOUND</div>;
  }

  return (
    <div className="bg-gray-200 min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
      <InfiniteScroll
        dataLength={blogs.length}
        next={() => fetchBlogs(page)}
        hasMore={hasMore}
        loader={<CircularProgress />}
        className="overflow-hidden p-10"
      >
          {blogs?.map((blog) => (
            <div key={blog._id} className="mt-9">
              <BlogCard
                title={blog.title}
                description={blog.description}
                picture={blog.picture}
                createdBy={blog.createdBy.firstname || "Unknown"}
                createdAt={blog.createdAt}
                likes={blog.likedBy.length}
                blogId={blog._id}
                isLiked={user ? blog.likedBy.includes(user._id) : false}
              />
            </div>
          ))}
      </InfiniteScroll>
        </div>
    </div>
  );
};

export default Feed;
