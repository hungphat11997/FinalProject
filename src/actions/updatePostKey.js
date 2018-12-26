export const UPDATE_POSTKEY = 'updatePostKey';

export function updatePostKey(newPostKey) {
    return {
        type: UPDATE_POSTKEY,
        postkey: newPostKey
    };
}