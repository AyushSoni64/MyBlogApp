const blogValidation = Object.freeze({
  getAllBlogs: {},
  addBlog: {
    title: {
      in: ["body"],
      isLength: {
        errorMessage: "Title must be at least 3 characters long.",
        options: { min: 3 },
      },
    },
    description: {
      in: ["body"],
      isLength: {
        errorMessage: "Description must be at least 10 characters long.",
        options: { min: 10 },
      },
    },
  },
  editBlog: {
    blogId: {
      in: ["params"],
      isMongoId: {
        errorMessage: "Invalid blog ID.",
      },
    },
    title: {
      in: ["body"],
      optional: true,
      isLength: {
        errorMessage: "Title must be at least 3 characters long.",
        options: { min: 3 },
      },
    },
    description: {
      in: ["body"],
      optional: true,
      isLength: {
        errorMessage: "Description must be at least 10 characters long.",
        options: { min: 10 },
      },
    },
  },
  findBlogById: {
    blogId: {
      in: ["params"],
      isMongoId: {
        errorMessage: "Invalid blog ID.",
      },
    },
  },
  deleteBlog: {
    blogId: {
      in: ["params"],
      isMongoId: {
        errorMessage: "Invalid blog ID.",
      },
    },
  },
  toggleLike: {
    blogId: {
      in: ["params"],
      isMongoId: {
        errorMessage: "Invalid blog ID.",
      },
    },
  },
  getBlogsByUserId: {
    userId: {
      in: ["params"],
      isMongoId: {
        errorMessage: "Invalid user ID.",
      },
    },
  },
});

export default blogValidation;
