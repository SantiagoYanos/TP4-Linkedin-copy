import { PrismaClient } from "@prisma/client";
const prisma = PrismaClient();

async function getPostComments(postId) {
  try {
    const comments = prisma.comment.find({
      where: {
        post_id: postId,
      },
    });

    return comments;
  } catch (err) {
    console.log(err);
  }
}

async function createComment(data) {
  try {
    const newComment = prisma.comment.create({
      data: data,
    });

    return newComment;
  } catch (err) {
    console.log(err);
  }
}

async function updateComment(id, data) {
  try {
    const editedComment = prisma.comment.update({
      where: {
        id: id,
      },
      data: data,
    });

    return editedComment;
  } catch (err) {
    console.log(err);
  }
}

async function activeComment(id) {
  const activedComment = await prisma.comment.updateOne({
    where: {
      id: id,
    },
    data: {
      active: true,
    },
  });
  return activedComment;
}

async function deactiveComment(id) {
  const deactivedComment = await prisma.comment.updateOne({
    where: {
      id: id,
    },
    data: {
      active: false,
    },
  });
  return deactivedComment;
}

export default {
  getPostComments,
  createComment,
  updateComment,
  activeComment,
  deactiveComment,
};
