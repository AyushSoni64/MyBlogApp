const userValidation = Object.freeze({
  get: {},
  create: {
    firstname: {
      in: ["body"],
      isLength: {
        errorMessage: "First name must be at least 3 characters long.",
        options: { min: 3 },
      },
    },
    lastname: {
      in: ["body"],
      isLength: {
        errorMessage: "Last name must be at least 3 characters long.",
        options: { min: 3 },
      },
    },
    email: {
      in: ["body"],
      matches: {
        options: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: "Please enter a valid email address.",
      },
      isLength: {
        errorMessage: "Email must be at least 6 characters long.",
        options: { min: 6 },
      },
    },
    password: {
      in: ["body"],
      isLength: {
        errorMessage: "Password must be at least 6 characters long.",
        options: { min: 6 },
      },
    },
    role: {
      in: ["body"],
      optional: true,
      isLength: {
        errorMessage: "Role must be at least 3 characters long.",
        options: { min: 3 },
      },
    },
  },

  update: {
    originalId: {
      in: ["params"],
      exists: {
        errorMessage: "The originalId parameter is required.",
      },
      isString: {
        errorMessage: "The originalId parameter must be a string.",
      },
    },
  },
  delete: {
    originalId: {
      in: ["params"],
      exists: {
        errorMessage: "The originalId parameter is required.",
      },
      isString: {
        errorMessage: "The originalId parameter must be a string.",
      },
    },
  },
  login: {
    email: {
      in: ["body"],
      matches: {
        options: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: "Please enter a valid email address.",
      },
      isLength: {
        errorMessage: "Email must be at least 6 characters long.",
        options: { min: 6 },
      },
    },
    password: {
      in: ["body"],
      isLength: {
        errorMessage: "Password must be at least 6 characters long.",
        options: { min: 6 },
      },
    },
  },
});

export default userValidation;
