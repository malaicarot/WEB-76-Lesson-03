import {DB_CONFIG} from "../configs/db.config.js";
import {ApiUtils} from "../utils/api.util.js";
import {API_METHOD} from "../utils/api.enum.js";
import {v4 as uuidv4} from "uuid";
import {CommentDTO} from "../dto/comment.dto.js";
import { ERROR_MSG } from "../constants/errorMessage.constant.js";
import { CommonUtils } from "../utils/common.util.js";

const commentUrl = DB_CONFIG.baseUrl + DB_CONFIG.resources.comment.contextPath;



async function getAllComment() {
    return await ApiUtils.executeHttpRequest(commentUrl, API_METHOD.GET)
}

async function getById(commentId) {
    return await ApiUtils.executeHttpRequest(commentUrl + "/" + commentId, API_METHOD.GET)
}

async function create(comment) {
    if(!(comment instanceof CommentDTO)){
        throw new Error ("Invalid user object");
    }

    comment.id = commentIdGenerator();

    return await ApiUtils.executeHttpRequest(commentUrl, API_METHOD.POST, comment);
    
};

async function getCommentByPostId(post, postId) {

    const comment = await getAllComment();
    const commentByPostId = comment.filter(item => item.postId === postId);

    // return await ApiUtils.executeHttpRequest(commentUrl, API_METHOD.GET, commentByPostId);
    return {post, commentByPostId};
}


async function updateComment(commentId, userId, commentNeedFix) {
    if(!commentNeedFix instanceof CommentDTO){
        throw new Error ("Invalid comment object"); 
    }

   const comment = await getById(commentId);


    if(CommonUtils.checkNullOrUndefine(comment)){
        throw new BadRequestError(ERROR_MSG.COMMENT_NOT_FOUND + commentId);
    }

    if(comment.authorId !== userId){
        throw new Error("The user is not the author of this comment")
    }

    comment.content = commentNeedFix.content;


    return await ApiUtils.executeHttpRequest(commentUrl + "/" + commentId, API_METHOD.PUT, comment);
}

async function getFirstComments(post) {

    const comment = await getAllComment();

    const postWithComments = post.map((post) =>{
        const postComments = comment.filter((comment) => {
            comment.postId === post.id
        })

        const firstThreeComments = postComments.slice(0, 3);

        return { ...post, comments: firstThreeComments };
    })
    


    return postWithComments;
    
}

function commentIdGenerator(){
    return 'CMT' + uuidv4();
};

export const CommentService = {
    create,
    getAllComment,
    getCommentByPostId,
    updateComment,
    getFirstComments
};