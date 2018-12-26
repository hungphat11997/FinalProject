export const UPDATE_POST = 'updatePost';

export function updatePost(newPost) {
    return {
        type: UPDATE_POST,
        post: newPost
    };
}