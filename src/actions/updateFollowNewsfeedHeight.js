export const UPDATE_FOLLOWNEWSFEEDHEIGHT = 'updateFollowNewsfeedHeight';

export function updateFollowNewsfeedHeight(newFollowNewsfeedHeight) {
    return {
        type: UPDATE_FOLLOWNEWSFEEDHEIGHT,
        follownewsfeedheight: newFollowNewsfeedHeight,
    };
}