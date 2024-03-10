import { ERROR_MSG } from "../constants/errorMessage.constant.js";
import { BadRequestError } from "../error/badRequest.error.js";
import {CommonUtils} from "../utils/common.util.js";

export class CommentDTO {
    constructor(comment){
        if(!('content' in comment) && CommonUtils.checkNullOrUndefine(comment.content)){
            throw BadRequestError(ERROR_MSG.INVALID_REQ);
        }

        this.id = CommonUtils.checkNullOrUndefine(comment.id) ? comment.id : null;
        this.content = comment.content;
        this.postId = CommonUtils.checkNullOrUndefine(comment.postId) ? comment.postId : null;
        this.authorId = CommonUtils.checkNullOrUndefine(comment.authorId) ? comment.authorId : null;

    }
}