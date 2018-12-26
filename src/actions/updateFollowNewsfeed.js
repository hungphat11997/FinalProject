export const UPDATE_FOLLOWNEWSFEED = 'updateFollowNewsfeed';

export function updateFollowNewsfeed(newFollowNewsfeed) {
    return {
        type: UPDATE_FOLLOWNEWSFEED,
        follownewsfeed: newFollowNewsfeed,
    };
}