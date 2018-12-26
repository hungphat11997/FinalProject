export const UPDATE_POSTNAME = 'updatePostName';

export function updatePostName(newPostName) {
    return {
        type: UPDATE_POSTNAME,
        postname: newPostName
    };
}