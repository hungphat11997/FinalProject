import { UPDATE_PAYMENTUSER} from '../actions/updatePaymentUser';
export default function paymentuserReducer(state = {payUser: []}, action) {

    switch(action.type) {
        case UPDATE_PAYMENTUSER:
        return action.paymentuser;
        default: 
        return state;
    }
}