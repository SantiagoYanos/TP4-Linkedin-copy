import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getAllPosts() {
  try {
    const posts = await prisma.post.findMany();
    return posts;
  } catch (err) {
    console.log(err);
  }
}

async function getOnePost(id) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
}

async function createPost(data) {
  try {
    const newPost = await prisma.post.create({
      data: data,
    });

    return newPost;
  } catch (err) {
    console.log(err);
  }
}

async function updatePost(id, data) {
  try {
    const editedPost = await prisma.post.update({
      where: {
        id: id,
      },
      data: data,
    });

    return editedPost;
  } catch (err) {
    console.log(err);
  }
}

async function activePost(id) {
  const activedPost = await prisma.post.updateOne({
    where: {
      id: id,
    },
    data: {
      active: true,
    },
  });
  return activedPost;
}

async function deactivePost(id) {
  const deactivedPost = await prisma.post.updateOne({
    where: {
      id: id,
    },
    data: {
      active: false,
    },
  });
  return deactivedPost;
}

export default {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  activePost,
  deactivePost,
};
