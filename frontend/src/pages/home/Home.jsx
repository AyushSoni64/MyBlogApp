import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-6xl font-bold mb-4">Welcome to MyBlog App</h1>
      <p className="text-2xl mb-8">
        Discover amazing blogs and share your thoughts with the community.
      </p>
      <Link
        to="/blogs"
        className="text-4xl text-white bg-blue-500 px-6 py-3 rounded-lg transition-transform transform hover:scale-105 hover:bg-blue-600"
      >
        Click here to browse blogs
      </Link>
    </div>
  );
};

export default Home;
