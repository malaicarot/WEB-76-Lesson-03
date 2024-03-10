function checkNullOrUndefine(...args) {
    for(const arg of args){
        if(arg === null || arg === undefined){
            return true;
        };
    };
    return false;
};

export const CommonUtils = {
    checkNullOrUndefine
};