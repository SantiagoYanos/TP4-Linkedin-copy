import service from "../../services/posts/index.js";

const getAllPosts = async (req, res) => {
  const posts = await service.getAllPosts();

  if (posts) {
    res.status(200).json(posts);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener Posts de la base de datos" });
  }
};

const getOnePost = async (req, res) => {
  const post = await service.getOnePost(req.body.id);

  if (post) {
    res.status(200).json(post);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al obtener un Post de la base de datos" });
  }
};

const createPost = async (req, res) => {
  const { author_id, body } = req.body;

  if (!author_id || !body) {
    res.status(400).json({ message: "Please provide all required fields" });
  }

  const newPost = {
    ...req.body,
  };

  const createdPost = await service.createPost(newPost);

  if (createdPost) {
    res.status(200).json(createPost);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al crear un Post en la base de datos" });
  }
};

const updatePost = async (req, res) => {
  const post = await service.updatePost(req.body.id, req.body);

  if (post) {
    res.status(200).json(post);
  } else {
    res
      .status(400)
      .json({ message: "Error: Al editar un Post en la base de datos" });
  }
};

const deactivePost = async (req, res) => {
  const post = await service.deactivePost(req.params.id);
  res.status(200).json(post);
};

const activePost = async (req, res) => {
  const post = await service.activePost(req.params.id);
  res.status(200).json(post);
};

export default {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  activePost,
  deactivePost,
};
