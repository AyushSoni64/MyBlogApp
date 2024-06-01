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
import { setGlobalLogout, useAuth } from "../context/AuthContext";
import UpdateBlog from "../components/updateBlog/UpdateBlog";
import Home from "../pages/home/Home";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Router = () => {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setGlobalLogout(logout);
    const checkTokenExpiry = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          logout();
        }
      }
    };
    checkTokenExpiry();
  }, [logout]);

  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/blogs" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<Feed />} />

          <Route path="/blogs/:blogId" element={<BlogDetails />} />

          <Route
            path="/create-blogs"
            element={isAuthenticated ? <CreatePost /> : <Navigate to="/blogs" />}
          />

          <Route
            path="/update-blog/:blogId"
            element={isAuthenticated ? <UpdateBlog /> : <Navigate to="/blogs" />}
          />

          <Route
            path="/liked-posts"
            element={isAuthenticated ? <MyLikedPost /> : <Navigate to="/blogs" />}
          />

          <Route
            path="/my-posts"
            element={isAuthenticated ? <MyCreatedPost /> : <Navigate to="/blogs" />}
          />

          <Route
            path="/profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/blogs" />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default Router;
