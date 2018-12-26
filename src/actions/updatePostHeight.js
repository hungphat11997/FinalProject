export const UPDATE_POSTHEIGHT = 'updatePostHeight';

export function updatePostHeight(newPostHeight) {
    return {
        type: UPDATE_POSTHEIGHT,
        postheight: newPostHeight
    };
}