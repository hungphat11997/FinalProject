export const UPDATE_PAYMENTHISTORY = 'updatePaymentHistory';

export function updatePaymentHistory(newPaymentHistory) {
    return {
        type: UPDATE_PAYMENTHISTORY,
        paymenthistory: newPaymentHistory
    };
}