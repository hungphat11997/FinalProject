export const UPDATE_FOLLOWNEWSFEEDKEY = 'updateFollowNewsfeedKey';

export function updateFollowNewsfeedKey(newFollowNewsfeedKey) {
    return {
        type: UPDATE_FOLLOWNEWSFEEDKEY,
        follownewsfeedkey: newFollowNewsfeedKey,
    };
}