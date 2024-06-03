import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import axiosInstance from "../../utils/axoisInstance";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import { useToastContext } from "../../context/ToastContext";

const LikeButton = (props) => {
  const { blogId, isLiked, setLiked, likeCount, setLikeCount, onUnlike } = props;
  const { user } = useAuth();
  const { showError } = useToastContext();
  const toggleLike = async () => {
    try {
      if (!user) {
        showError("Please Login to like this blog");
        return;
      }
      const response = await axiosInstance.patch(`/blogs/${blogId}/like`);
      if (response.status === 200) {
        const newIsLiked = !isLiked;
        setLiked(newIsLiked);
        setLikeCount(!newIsLiked ? likeCount - 1 : likeCount + 1);
        if (!newIsLiked && onUnlike) {
          onUnlike(blogId); 
        }
      }
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };

  return (
    <>
      <button onClick={toggleLike}>
        {isLiked ? (
          <FaThumbsUp size={20} color={"blue"} />
        ) : (
          <FaRegThumbsUp size={20} color={"black"} />
        )}
      </button>
      <span className="text-lg"> &nbsp;{likeCount}</span>
    </>
  );
};

LikeButton.propTypes = {
  blogId: PropTypes.string,
  isLiked: PropTypes.bool,
  setLiked: PropTypes.func,
  likeCount: PropTypes.number,
  setLikeCount: PropTypes.func,
  onUnlike: PropTypes.func
};

export default LikeButton;
