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

  const toggleTheme = () => {};

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center fixed w-full top-0 left-0 z-10">
      <div className="text-white text-xl font-bold">
        <Link to="/">MyBlogsApp</Link>
      </div>
      <div className="flex items-center space-x-4">
        <button
          className="bg-white text-blue-600 px-4 py-2 rounded"
          onClick={toggleTheme}
        >
          Toggle Theme
        </button>
        <button
          className="bg-white text-blue-600 px-4 py-2 rounded"
          onClick={handleCreatePostClick}
        >
          Create Post
        </button>
        {!isAuthenticated ? (
          <>
            {location.pathname === "/signup" && (
              <Link
                to="/login"
                className="bg-white text-blue-600 px-4 py-2 rounded"
              >
                Login
              </Link>
            )}
            {location.pathname === "/" && (
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
            <Link
              to="/my-posts"
              className="bg-white text-blue-600 px-4 py-2 rounded"
            >
              My Created Posts
            </Link>
            <Link
              to="/liked-posts"
              className="bg-white text-blue-600 px-4 py-2 rounded"
            >
              My Liked Posts
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
