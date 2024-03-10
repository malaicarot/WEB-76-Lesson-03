import {UserDTO} from "../dto/user.dto.js";
import {CommentDTO} from "../dto/comment.dto.js";
import { CommonUtils } from "../utils/common.util.js";
import { ERROR_MSG } from "../constants/errorMessage.constant.js";
import { UserService as userService } from "../service/user.service.js";
import { BadRequestError } from "../error/badRequest.error.js";
import { BaseError } from "../error/base.error.js";
import { PostDTO } from "../dto/post.dto.js";


/* Tạo Post */
async function createPost(req, res) {
   
    try{
        const userId = req.params.userId;
        
        if(CommonUtils.checkNullOrUndefine(req.body) || CommonUtils.checkNullOrUndefine(userId)){
            throw new BadRequestError(ERROR_MSG.INVALID_REQ);
        };

        const newPost = new PostDTO(req.body);
        res.json(await userService.createPost(userId, newPost))
    }catch(err){
        console.error(`Error while create new post`, err.message);

        if(err instanceof BaseError){
            res.status(err.statusCode)
        }else{
            res.status(500)
        }

        res.json({
            error: {
                message: err.message
            }
        });
    }
    
}

/* Bình luận Post */

async function commentOnPostByPostId(req, res){
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;
        if(CommonUtils.checkNullOrUndefine(req.body) || CommonUtils.checkNullOrUndefine(userId) || CommonUtils.checkNullOrUndefine(postId)){
            throw new BadRequestError(ERROR_MSG.INVALID_REQ);
        };

        const newComment = new CommentDTO(req.body);
        res.json(await userService.commentOnPostByPostId(newComment, userId, postId));
    } catch (err) {
        console.error(`Error while comment on post`, err.message);

        if(err instanceof BaseError){
            res.status(err.statusCode)
        }else{
            res.status(500)
        }

        res.json({
            error: {
                message: err.message
            }
        });
    }
}


/*Cập nhật Post*/

async function updatePost(req, res){
    try {
        const userId = req.params.userId;
        const postId = req.params.postId;
        
        if(CommonUtils.checkNullOrUndefine(req.body) || CommonUtils.checkNullOrUndefine(userId) || CommonUtils.checkNullOrUndefine(postId)){
            throw new BadRequestError(ERROR_MSG.INVALID_REQ);
        };
       
        const newContent = new PostDTO(req.body);
        
        res.json(await userService.updatePost(userId, postId, newContent));
        
    } catch (err) {

        console.error(`Error while update post`, err.message);

        if(err instanceof BaseError){
            res.status(err.statusCode)
        }else{
            res.status(500)
        }

        res.json({
            error: {
                message: err.message
            }
        });
        
    }
}


export const PostController = {
    createPost,
    commentOnPostByPostId,
    updatePost,
};