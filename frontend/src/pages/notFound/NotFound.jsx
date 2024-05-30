import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center p-4">
      <h1 className="text-8xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="text-2xl text-white bg-red-500 px-6 py-3 rounded-lg transition-transform transform hover:scale-105 hover:bg-red-600"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
