import { UPDATE_PAYMENTHISTORY} from '../actions/updatePaymentHistory';
export default function paymenthistoryReducer(state = {payHis: []}, action) {

    switch(action.type) {
        case UPDATE_PAYMENTHISTORY:
        return action.paymenthistory;
        default: 
        return state;
    }
}