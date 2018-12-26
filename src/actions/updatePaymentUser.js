export const UPDATE_PAYMENTUSER = 'updatePaymentUser';

export function updatePaymentUser(newPaymentUser) {
    return {
        type: UPDATE_PAYMENTUSER,
        paymentuser: newPaymentUser
    };
}