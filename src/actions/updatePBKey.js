export const UPDATE_PBKEY = 'updatePBKey';

export function updatePBKey(newPBKey) {
    return {
        type: UPDATE_PBKEY,
        pbkey: newPBKey
    };
}