import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getPostComments(postId) {
  try {
    const comments = await prisma.comment.findMany({
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
    const newComment = await prisma.comment.create({
      data: data,
    });

    return newComment;
  } catch (err) {
    console.log(err);
  }
}

async function updateComment(id, data) {
  try {
    const editedComment = await prisma.comment.update({
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
