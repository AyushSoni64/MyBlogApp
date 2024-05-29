import { FaRegThumbsUp } from "react-icons/fa";
import PropTypes from "prop-types";

const BlogCard = (props) => {
  const { title, description, picture, createdBy, createdAt, likes } = props;
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden m-4">
      <img
        className="w-full h-48 object-cover"
        src={picture}
        alt={title}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700 text-base mb-2">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-gray-600 text-sm">
            <p>Created by: {createdBy}</p>
            <p>Created on: {new Date(createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <FaRegThumbsUp className="mr-1" />
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogCard.propTypes = {
  picture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
};

export default BlogCard;
