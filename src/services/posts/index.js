import Post from "../../models/Post.js";

const getAllPosts = () => {
  const posts = Post.getAllPosts();
  return posts;
};

// const getOnePost = (id) => {
//   const post = Post.getOnePost(id);

//   return post;
// };

const getUserPosts = (userId) => {
  const posts = Post.getUserPosts(userId);

  return posts;
};

const createPost = (data) => {
  const post = Post.createPost(data);

  return post;
};

const updatePost = (id, data) => {
  const post = Post.updatePost(id, data);

  return post;
};

const activePost = (id) => {
  const post = Post.activePost(id);

  return post;
};

const deactivePost = (id) => {
  const post = Post.deactivePost(id);

  return post;
};

export default {
  getAllPosts,
  //getOnePost,
  getUserPosts,
  createPost,
  updatePost,
  activePost,
  deactivePost,
};
