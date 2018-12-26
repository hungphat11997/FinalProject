export const UPDATE_PAYMENTUSERLIST = 'updatePaymentUserList';

export function updatePaymentUserList(newPaymentUserList) {
    return {
        type: UPDATE_PAYMENTUSERLIST,
        paymentuserlist: newPaymentUserList
    };
}