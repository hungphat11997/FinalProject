export const UPDATE_FOLLOWKEYNAME = 'updateFollowKeyName';

export function updateFollowKeyName(newFollowKeyName) {
    return {
        type: UPDATE_FOLLOWKEYNAME,
        followkeyname: newFollowKeyName,
    };
}