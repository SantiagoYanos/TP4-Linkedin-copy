import service from "../../services/comments/index.js";

const getPostComments = async (req, res) => {
  if (req.params.post_id) {
    const comments = await service.getPostComments(Number(req.params.post_id));

    return res
      .status(200)
      .json({ message: "Comments obtained succesfully!", data: comments });
  } else {
    return res.status(400).send("Error: Post Id Format");
  }
};

const createComment = async (req, res) => {
  const { body, post_id, written_by, active } = req.body;

  if ((!req.body.post_id, !req.body.body)) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const newComment = {
    body,
    post_id,
    written_by,
    active,
  };

  const comment = await service.createComment(newComment);

  if (comment) {
    return res
      .status(200)
      .json({ message: "Comment created succesfully!", data: comment });
  } else {
    return res.status(400).json({
      message: "Error: Creating Comments from the database",
    });
  }
};

const updateComment = async (req, res) => {
  const { body, post_id, written_by, active } = req.body;

  const newData = {
    body,
    post_id,
    written_by,
    active,
  };

  const comment = await service.updateComment(req.body.id, req.Data);

  if (comment) {
    return res
      .status(200)
      .json({ message: "Comment edited successfully!", data: comment });
  } else {
    return res.status(400).json({
      message: "Error: Editing Comments from the database",
    });
  }
};

const deactiveComment = async (req, res) => {
  const comment = await service.deactiveComment(Number(req.params.id));

  if (comment) {
    return res
      .status(200)
      .json({ message: "Comment deactivated successfully!", data: comment });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Deactivating a Comment in the database" });
  }
};

const activeComment = async (req, res) => {
  const comment = await service.activeComment(Number(req.params.id));

  if (comment) {
    return res
      .status(200)
      .json({ message: "Comment activated successfully!", data: comment });
  } else {
    return res
      .status(400)
      .json({ message: "Error: Activating a Comment in the database" });
  }
};

export default {
  getPostComments,
  createComment,
  updateComment,
  deactiveComment,
  activeComment,
};
