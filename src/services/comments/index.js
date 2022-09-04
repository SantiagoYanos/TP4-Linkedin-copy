import Comment from "../../models/Comment.js";

const getPostComments = (idPost) => {
  const posts = Post.getPostComments(idPost);

  return posts;
};

const createComment = (data) => {
  const newComment = Post.createComment(data);

  return newComment;
};

const updateComment = (id, data) => {
  const editedComment = Post.updateComment(id, data);

  return editedComment;
};

const activeComment = (id) => {
  const comment = Post.activeComment(id);

  return comment;
};

const deactiveComment = (id) => {
  const comment = Post.deactiveComment(id);

  return comment;
};

export default {
  getPostComments,
  createComment,
  updateComment,
  activeComment,
  deactiveComment,
};
