export const UPDATE_PROFILE = 'updateProfile';

export function updateProfile(newProfile) {
    return {
        type: UPDATE_PROFILE,
        profile: newProfile
    };
}