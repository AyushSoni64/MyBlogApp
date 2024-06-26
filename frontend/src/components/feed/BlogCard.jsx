import { useState } from "react";
import PropTypes from "prop-types";
import LikeButton from "../genericComponent/LikeButton";
import { Link } from "react-router-dom";

const BlogCard = (props) => {
  const {
    title,
    description,
    picture,
    createdBy,
    createdAt,
    likes,
    blogId,
    isLiked,
    onUnlike,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden m-4 w-full">
      <img className="w-1/3 h-56 object-cover" src={picture} alt={title} />
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <Link to={`/blogs/${blogId}`}>
            <h3 className="text-xl font-bold mb-2 hover:underline">
              {truncateDescription(title, 100)}
            </h3>
          </Link>
          <p className="text-gray-700 text-base mb-2">
            {isExpanded ? description : truncateDescription(description, 100)}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={toggleReadMore}
            >
              {isExpanded ? " Show less" : " Read more"}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-gray-600 text-sm">
            <p>Created by: {createdBy}</p>
            <p>Created on: {new Date(createdAt).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <LikeButton
              blogId={blogId}
              isLiked={liked}
              setLiked={setLiked}
              likeCount={likeCount}
              setLikeCount={setLikeCount}
              onUnlike={onUnlike}
            />
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
  blogId: PropTypes.string,
  isLiked: PropTypes.bool,
  onUnlike: PropTypes.func,
};

export default BlogCard;
