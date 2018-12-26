import { UPDATE_PAYMENTUSERLIST} from '../actions/updatePaymentUserList';
export default function paymentuserlistReducer(state = {payUserList: []}, action) {

    switch(action.type) {
        case UPDATE_PAYMENTUSERLIST:
        return action.paymentuserlist;
        default: 
        return state;
    }
}