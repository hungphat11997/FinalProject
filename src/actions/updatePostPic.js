export const UPDATE_POSTPIC = 'updatePostPic';

export function updatePostPic(newPostPic) {
    return {
        type: UPDATE_POSTPIC,
        postpic: newPostPic
    };
}