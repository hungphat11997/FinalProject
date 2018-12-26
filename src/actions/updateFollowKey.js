export const UPDATE_FOLLOWKEY = 'updateFollowKey';

export function updateFollowKey(newFollowKey) {
    return {
        type: UPDATE_FOLLOWKEY,
        followkey: newFollowKey,
    };
}