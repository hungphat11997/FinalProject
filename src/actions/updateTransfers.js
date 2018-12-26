export const UPDATE_TRANSFERS = 'updateTransfers';

export function updateTransfers(newTransfers) {
    return {
        type: UPDATE_TRANSFERS,
        transfers: newTransfers
    };
}