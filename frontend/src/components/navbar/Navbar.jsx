import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, logout, setAuthMessage } = useAuth();
  const handleCreatePostClick = () => {
    if (!isAuthenticated) {
      setAuthMessage("Please log in to create a post.");
      navigate("/login");
    } else {
      setAuthMessage("");
      navigate("/create-blogs");
    }
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10">
      <div className="text-white text-xl font-bold">
        <Link to="/blogs">MyBlogsApp</Link>
      </div>
      <div className="flex items-center space-x-4">
        {!isAuthenticated ? (
          <>
            {(location.pathname === "/signup" ||
              location.pathname === "/" ||
              location.pathname.includes("/blogs")) && (
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded"
              >
                Login
              </Link>
            )}
            {location.pathname === "/login" && (
              <Link
                to="/signup"
                className="bg-white text-blue-600 px-4 py-2 rounded"
              >
                Signup
              </Link>
            )}
          </>
        ) : (
          <>
            <button
              className="bg-white text-blue-600 px-4 py-2 rounded"
              onClick={handleCreatePostClick}
            >
              WriteBlog
            </button>
            <Link
              to="/my-posts"
              className="bg-white text-blue-600 px-4 py-2 rounded"
            >
              MyBlogs
            </Link>
            <Link
              to="/liked-posts"
              className="bg-white text-blue-600 px-4 py-2 rounded"
            >
              MyLikedBlogs
            </Link>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
