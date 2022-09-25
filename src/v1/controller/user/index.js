import serviceUser from "../../../services/users/index.js";
import servicePost from "../../../services/posts/index.js";
import serviceComment from "../../../services/comments/index.js";
import { avatarRegex, emailRegex, phoneRegex } from "../../../utils/regex.js";
import { uniqueID } from "../../../utils/uniqueID.js";

const createUser = async (req, res) => {
  const {
    name,
    surname,
    email,
    password,
    avatar,
    birthdate,
    pronouns,
    nationality,
    residence,
    phone,
    description,
    actualJob,
    active,
    status,
    language_id,
    organization_id,
    country_id,
    state_id,
    city_id,
  } = req.body;

  if (!req.body.email) {
    return res
      .status(400)
      .json({ msg: "Error: Please provide all required fields" });
  }

  const newUser = {
    id: uniqueID(req.body.email),
    name,
    surname,
    email,
    password,
    avatar,
    birthdate,
    pronouns,
    nationality,
    residence,
    phone,
    description,
    actualJob,
    active,
    status,
    language_id,
    organization_id,
    country_id,
    state_id,
    city_id,
  };

  if (!newUser.name || !newUser.email || !newUser.password) {
    return res
      .status(400)
      .json({
        message: "Please provide all required fields",
      })
      .end();
  }

  if (newUser.phone) {
    if (!phoneRegex.test(newUser.phone)) {
      return res
        .status(400)
        .json({
          message: "Please provide a valid phone number",
        })
        .end();
    }
  }

  if (!emailRegex.test(newUser.email) || !avatarRegex.test(newUser.avatar)) {
    return res
      .status(400)
      .json({
        message: "Please provide valid data",
      })
      .end();
  }

  console.log(newUser);

  const user = await serviceUser.createUser(newUser);

  if (user) {
    return;
  } else {
    return res
      .status(400)
      .json({ message: "Error: Creating a User in the database" });
  }
};

const updateUser = async (req, res) => {
  const {
    id,
    name,
    surname,
    email,
    password,
    avatar,
    birthdate,
    pronouns,
    nationality,
    residence,
    phone,
    description,
    actualJob,
    active,
    status,
    language_id,
    organization_id,
    country_id,
    state_id,
    city_id,
  } = req.body;

  const newData = {
    id,
    name,
    surname,
    email,
    password,
    avatar,
    birthdate,
    pronouns,
    nationality,
    residence,
    phone,
    description,
    actualJob,
    active,
    status,
    language_id,
    organization_id,
    country_id,
    state_id,
    city_id,
  };

  const user = await serviceUser.updateUser(id, newData);

  if (user) {
    return;
  } else {
    return res
      .status(400)
      .json({ message: "Error: Editing a User in the database" });
  }
};

const deactiveUser = async (req, res) => {
  const user = await serviceUser.deactiveUser(req.params.id);

  if (user) {
    return next();
  } else {
    return res
      .status(400)
      .json({ message: "Error: Deactivating a User in the database" });
  }
};

const activeUser = async (req, res) => {
  const user = await serviceUser.activeUser(req.params.id);

  if (user) {
    return next();
  } else {
    return res
      .status(400)
      .json({ message: "Error: Activating a User in the database" });
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

  const createdPost = await servicePost.createPost(newPost);

  if (createdPost) {
    return;
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

  const post = await servicePost.updatePost(req.body.id, newData);

  if (post) {
    return;
  } else {
    return res
      .status(400)
      .json({ message: "Error: Editing a Post in the database" });
  }
};

const deactivePost = async (req, res) => {
  const post = await servicePost.deactivePost(Number(req.params.id));

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
  const post = await servicePost.activePost(Number(req.params.id));

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

  const comment = await serviceComment.createComment(newComment);

  if (comment) {
    return;
  } else {
    return res.status(400).json({
      message: "Error: Creating Comments from the database",
    });
  }
};

export default {
  createUser,
  updateUser,
  activeUser,
  deactiveUser,
  createPost,
  updatePost,
  activePost,
  deactivePost,
  createComment,
};
