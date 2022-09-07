import service from "../../services/comments/index.js";

const getPostComments = async (req, res) => {
  if (req.body.post_id) {
    const comments = service.getPostComments(req.body.post_id);

    res.status(200).json(comments);
  } else {
    res.status(400).send("Error: Post Id Format");
  }
};

const createComment = async (req, res) => {
  if ((!req.body.post_id, !req.body.body)) {
    res.status(400).json({ message: "Please provide all required fields" });
  }

  const newComment = {
    ...req.body,
  };

  const comment = await service.createComment(newComment);

  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(400).json({
      message: "Error: Al crear un Comentario en la base de datos",
    });
  }
};

const updateComment = async (req, res) => {
  const comment = await service.updateComment(req.body.id, req.body);

  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(400).json({
      message: "Error: Al editar un Comentario en la base de datos",
    });
  }
};

const deactiveComment = async (req, res) => {
  const comment = await service.deactiveComment(Number(req.params.id));
  res.status(200).json(comment);
};

const activeComment = async (req, res) => {
  const comment = await service.activeComment(Number(req.params.id));
  res.status(200).json(comment);
};

export default {
  getPostComments,
  createComment,
  updateComment,
  deactiveComment,
  activeComment,
};
