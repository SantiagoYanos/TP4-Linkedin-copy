import Comment from "../../models/Comment.js";

const getPostComments = (idPost) => {
  const posts = Comment.getPostComments(idPost);

  return posts;
};

const createComment = (data) => {
  const newComment = Comment.createComment(data);

  return newComment;
};

const updateComment = (id, data) => {
  const editedComment = Comment.updateComment(id, data);

  return editedComment;
};

const activeComment = (id) => {
  const comment = Comment.activeComment(id);

  return comment;
};

const deactiveComment = (id) => {
  const comment = Comment.deactiveComment(id);

  return comment;
};

export default {
  getPostComments,
  createComment,
  updateComment,
  activeComment,
  deactiveComment,
};
