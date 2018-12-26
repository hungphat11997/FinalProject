export const UPDATE_READYTOLOGIN = 'updateReadyToLogin';

export function updateReadyToLogin(newReadyToLogin) {
    return {
        type: UPDATE_READYTOLOGIN,
        readytologin: newReadyToLogin
    };
}