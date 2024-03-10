import express from 'express';
import { UserController } from "../controllers/user.controller.js";
import { PostController } from '../controllers/post.controller.js';

const UserRouter = express.Router();

UserRouter.get("/", UserController.getAll);

UserRouter.get("/comment-of-post/:postId", UserController.getCommentByPostId);

UserRouter.get("/first-comments-of-post", UserController.getFirstComments);

UserRouter.post("/register", UserController.register);

UserRouter.post("/create-post/:userId", PostController.createPost);

UserRouter.post("/comment/post/:postId/by/user/:userId", PostController.commentOnPostByPostId);

UserRouter.put("/update-post/:postId/user/:userId", PostController.updatePost);

UserRouter.put("/update-comment/:commentId/user/:userId", UserController.updateComment);



export{UserRouter};
