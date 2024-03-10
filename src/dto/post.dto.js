import { ERROR_MSG } from "../constants/errorMessage.constant.js";
import { BadRequestError } from "../error/badRequest.error.js";
import {CommonUtils} from "../utils/common.util.js";

export class PostDTO {
    constructor(post){
        if(!('content' in post) && CommonUtils.checkNullOrUndefine(post.content)){
            throw BadRequestError(ERROR_MSG.INVALID_REQ)
        }
        this.id = CommonUtils.checkNullOrUndefine(post.id) ? post.id : null;
        this.content = post.content;
        this.authorId = CommonUtils.checkNullOrUndefine(post.authorId) ? post.authorId : null;
    }
}