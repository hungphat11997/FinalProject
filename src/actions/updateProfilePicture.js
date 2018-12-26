export const UPDATE_PROFILEPICTURE = 'updateProfilePicture';

export function updateProfilePicture(newProfilePicture) {
    return {
        type: UPDATE_PROFILEPICTURE,
        profilepicture: newProfilePicture
    };
}