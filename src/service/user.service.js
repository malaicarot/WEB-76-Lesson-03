import {DB_CONFIG} from "../configs/db.config.js";
import {ApiUtils} from "../utils/api.util.js";
import {API_METHOD} from "../utils/api.enum.js";
import {v4 as uuidv4} from "uuid";
import {UserDTO} from "../dto/user.dto.js";
import {CommentDTO} from "../dto/comment.dto.js";
import { CommonUtils } from "../utils/common.util.js";
import { ERROR_MSG } from "../constants/errorMessage.constant.js";
import { PostService } from "./post.service.js";
import { CommentService } from "./comment.service.js";
import { BadRequestError } from "../error/badRequest.error.js";
import { PostDTO } from "../dto/post.dto.js";

const useUrl = DB_CONFIG.baseUrl + DB_CONFIG.resources.user.contextPath;

async function getAllUsers(){
    return await ApiUtils.executeHttpRequest(useUrl, API_METHOD.GET);
};

async function getById(id) {
   return await ApiUtils.executeHttpRequest(useUrl + "/" + id, API_METHOD.GET)

};


async function registerUser(user) {
    if(!(user instanceof UserDTO)){
        throw new Error("Invalid user object");
    }

    user.id = userGeneratorId();
    return await ApiUtils.executeHttpRequest(useUrl, API_METHOD.POST, user);
    
}

async function commentOnPostByPostId(comment, userId, postId) {
    if(!(comment instanceof CommentDTO)){
        throw new Error ("Invalid comment object");
    }

    const user = await getById(userId);

    if(CommonUtils.checkNullOrUndefine(user)){
        throw new BadRequestError(ERROR_MSG.POST_NOT_FOUND + userId);
    }

    comment.authorId = user.id;

    return await PostService.addPostComment(comment, postId);
};

async function createPost(userId, post) {
    if(!(post instanceof PostDTO)){
        throw new Error ("Invalid post object");
    }

    const user = await getById(userId);

    if(CommonUtils.checkNullOrUndefine(user)){
        throw new  BadRequestError(ERROR_MSG.USER_NOT_FOUND + userId);
    }

    post.authorId = user.id;
    return await PostService.createPost(post);

}

async function updatePost(userId, postId, newContent) {
    if(!(newContent instanceof PostDTO)){
        throw new Error ("Invalid content object");
    }
   

    const user = await getById(userId);

    if(CommonUtils.checkNullOrUndefine(user)){
        throw new BadRequestError(ERROR_MSG.USER_NOT_FOUND + userId);
    }
   

    return await PostService.updatePost(userId, postId, newContent);
}



async function getCommentByPostId(postId) {
    return await PostService.getCommentByPostId(postId);
}

async function updateComment(commentId, userId, commentNeedFix) {
    if(!commentNeedFix instanceof CommentDTO){
        throw new Error ("Invalid comment object"); 
    }

    const user = getById(userId);

    if(CommonUtils.checkNullOrUndefine(user)){
        throw new BadRequestError(ERROR_MSG.USER_NOT_FOUND + userId);
    }

    return await CommentService.updateComment(commentId, userId, commentNeedFix);
    
}

async function getFirstComments() {
    return await PostService.getFirstComments();
    
}

function userGeneratorId(){
    return "US" + uuidv4();
};

export const UserService = {
    registerUser,
    getAllUsers,
    commentOnPostByPostId,
    createPost,
    updatePost,
    updateComment,
    getCommentByPostId,
    getFirstComments
};

