import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Feed from "../components/feed/Feed";
import BlogDetails from "../components/blogDetails/BlogDetails";
import CreatePost from "../components/createPost/CreatePost";
import MyLikedPost from "../components/myLikedPost/MyLikedPost";
import MyCreatedPost from "../components/myCreatedPost/MyCreatedPost";
import Profile from "../pages/profile/Profile";
import NotFound from "../pages/notFound/NotFound";
import Navbar from "../components/navbar/Navbar";
import { useAuth } from "../context/AuthContext";

const Router = () => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Feed /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Feed />} />
          <Route path="/:blogId" element={<BlogDetails />} />

          {/* Protected routes (user must be logged in) */}
          <Route
            path="/create-blogs"
            element={isAuthenticated ? <CreatePost /> : <Navigate to="/" />}
          />
          <Route path="/liked-posts" element={<MyLikedPost />} />
          <Route path="/my-posts" element={<MyCreatedPost />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default Router;
