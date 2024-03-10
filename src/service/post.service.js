import {DB_CONFIG} from "../configs/db.config.js";
import {ApiUtils} from "../utils/api.util.js";
import {API_METHOD} from "../utils/api.enum.js";
import {v4 as uuidv4} from "uuid";
import {CommentDTO} from "../dto/comment.dto.js";
import { CommonUtils } from "../utils/common.util.js";
import { BadRequestError } from "../error/badRequest.error.js";
import {CommentService} from "./comment.service.js";
import {PostDTO} from "../dto/post.dto.js";
import { ERROR_MSG } from "../constants/errorMessage.constant.js";

const postUrl = DB_CONFIG.baseUrl + DB_CONFIG.resources.post.contextPath;


async function  getAll(params) {
    return await ApiUtils.executeHttpRequest(postUrl, API_METHOD.GET)
    
}

async function getById(id) {
    return await ApiUtils.executeHttpRequest(postUrl + "/" + id,  API_METHOD.GET)
    
}

async function addPostComment(comment, postId) {
    if(!(comment instanceof CommentDTO)){
        throw new Error ("Invalid comment object");
    }

    const post = await getById(postId);

    if(CommonUtils.checkNullOrUndefine(post)){
        throw new BadRequestError(ERROR_MSG.POST_NOT_FOUND + postId);
    }

    comment.postId = post.id;

    return await CommentService.create(comment);
};

async function createPost(post) {
    if(!(post instanceof PostDTO)){
        throw new Error("Invalid post object")
    }

    post.id = postIdGenerator();
    console.log(post);
    return await ApiUtils.executeHttpRequest(postUrl, API_METHOD.POST, post);
}

async function updatePost(userId, postId, newContent){
    if(!(newContent instanceof PostDTO)){
        throw new Error("Invalid content object")
    }
  
    const post = await getById(postId);

    if(CommonUtils.checkNullOrUndefine(post)){
        throw new BadRequestError(ERROR_MSG.POST_NOT_FOUND + postId);
    }
 
    if(post.authorId !== userId){
        throw new Error("The user is not the author of this post")
    }

    post.content = newContent.content;

    return await ApiUtils.executeHttpRequest(postUrl + "/" + postId, API_METHOD.PUT, post);
}



async function getCommentByPostId(postId) {
    const post = await getById(postId)
    if(CommonUtils.checkNullOrUndefine(post)){
        throw new BadRequestError(ERROR_MSG.POST_NOT_FOUND + postId);
    }

    return await CommentService.getCommentByPostId(post, postId);
}

async function getFirstComments() {
    const post = await getAll();

    if(CommonUtils.checkNullOrUndefine(post)){
        throw new BadRequestError(ERROR_MSG.POST_NOT_FOUND);
    }

    return await CommentService.getFirstComments(post);
}




function postIdGenerator() {
    return "PS" + uuidv4();
    
};

export const PostService = {
    getAll,
    getById,
    addPostComment,
    createPost,
    updatePost,
    getCommentByPostId,
    getFirstComments
};



