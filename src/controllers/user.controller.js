import {UserDTO} from "../dto/user.dto.js";
import {CommentDTO} from "../dto/comment.dto.js";
import { CommonUtils } from "../utils/common.util.js";
import { ERROR_MSG } from "../constants/errorMessage.constant.js";
import { UserService as userService } from "../service/user.service.js";
import { BadRequestError } from "../error/badRequest.error.js";
import { BaseError } from "../error/base.error.js";
import { PostDTO } from "../dto/post.dto.js";



async function getAll(req, res) {
    try {
        res.json(await userService.getAllUsers());
        
    } catch (err) {
        console.error(`Error while get all user`, err.message);

        if(err instanceof BaseError){
            res.status(err.status)
        }else{
            res.status(500)
        }

        res.json({
            error: {
                message: err.message
            }
        });
    };
};

async function register(req, res) {
    try{
        if(CommonUtils.checkNullOrUndefine(req.body)){
            throw new BadRequestError(ERROR_MSG.INVALID_REQ);
        };

        const newUser = new UserDTO(req.body);
        res.json(await userService.registerUser(newUser));
    }catch(err){
        console.error(`Error while register new user`, err.message);

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
    };
    
};



/*Cập nhật comment*/

async function updateComment(req, res) {
    try {
        const commentId = req.params.commentId;
        const userId = req.params.userId;
                
        if(CommonUtils.checkNullOrUndefine(req.body) || CommonUtils.checkNullOrUndefine(userId) || CommonUtils.checkNullOrUndefine(commentId)){
            throw new BadRequestError(ERROR_MSG.INVALID_REQ);
        };
       
        const commentNeedFix = new CommentDTO(req.body);
        
        res.json(await userService.updateComment(commentId, userId, commentNeedFix));
        
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

/*Lấy comment từ bài post (lấy bài post và tất cả comment của nó)*/
async function getCommentByPostId(req, res) {
    try {
        const postId = req.params.postId;
 
        if(CommonUtils.checkNullOrUndefine(postId)){
            throw new BadRequestError(ERROR_MSG.INVALID_REQ);
          
        };
        
        res.json(await userService.getCommentByPostId(postId))
  
    } catch (err) {
        console.error(`Error while get comment`, err.message);

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

/*Lấy bài post và 3 comment đầu*/
async function getFirstComments(req, res) {
    try {
 
        res.json(await userService.getFirstComments())
  
    } catch (err) {
        console.error(`Error while get post and comment`, err.message);

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

export const UserController = {
    getAll,
    register,
    // createPost,
    // commentOnPostByPostId,
    // updatePost,
    updateComment,
    getCommentByPostId,
    getFirstComments
};