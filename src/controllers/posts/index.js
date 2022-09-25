import service from "../../services/posts/index.js";

const getAllPosts = async (req, res) => {
  const posts = await service.getAllPosts();

  if (posts) {
    return res
      .status(200)
      .json({ message: "Posts obtained successfully!", data: posts });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining Posts from the database" });
  }
};

// const getOnePost = async (req, res) => {
//   const post = await service.getOnePost(Number(req.params.id));

//   if (post) {
//     return res
//       .status(200)
//       .json({ message: "Post obtained successfully!", data: post });
//   } else {
//     return res
//       .status(400)
//       .json({ message: "Error: Obtaining a Post from the database" });
//   }
// };

const getUserPosts = async (req, res) => {
  const posts = await service.getUserPosts(req.params.userId);

  if (posts) {
    return res
      .status(200)
      .json({ message: "User's Posts obtained successfully!", data: posts });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Obtaining User's Posts from the database" });
  }
};

const createPost = async (req, res) => {
  const { body, multimedia, author_id, active } = req.body;

  if (!author_id || !body) {
    res.status(400).json({ message: "Please provide all required fields" });
  }

  const newPost = {
    body,
    multimedia,
    author_id,
    active,
  };

  const createdPost = await service.createPost(newPost);

  if (createdPost) {
    return res
      .status(200)
      .json({ message: "Post created successfully!", data: createdPost });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Creating a Post in the database" });
  }
};

const updatePost = async (req, res) => {
  const { body, multimedia, author_id, active } = req.body;

  const newData = {
    body,
    multimedia,
    author_id,
    active,
    updatePost: new Date.now(),
  };

  const post = await service.updatePost(req.body.id, newData);

  if (post) {
    return res
      .status(200)
      .json({ message: "Post edited successfully!", data: post });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Editing a Post in the database" });
  }
};

const deactivePost = async (req, res) => {
  const post = await service.deactivePost(Number(req.params.id));

  if (post) {
    return res
      .status(200)
      .json({ message: "Post deactivated successfully!", data: post });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Deactivating a Post in the database" });
  }
};

const activePost = async (req, res) => {
  const post = await service.activePost(Number(req.params.id));

  if (post) {
    return res
      .status(200)
      .json({ message: "Post activated successfully!", data: post });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Activating a Post in the database" });
  }
};

export default {
  getAllPosts,
  // getOnePost,
  getUserPosts,
  createPost,
  updatePost,
  activePost,
  deactivePost,
};
