export const UPDATE_FOLLOWKEYPIC = 'updateFollowKeyPic';

export function updateFollowKeyPic(newFollowKeyPic) {
    return {
        type: UPDATE_FOLLOWKEYPIC,
        followkeypic: newFollowKeyPic,
    };
}