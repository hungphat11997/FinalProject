import { UPDATE_TRANSFERS} from '../actions/updateTransfers';
export default function transfersReducer(state = false, action) {

    switch(action.type) {
        case UPDATE_TRANSFERS:
        return action.transfers;
        default: 
        return state;
    }
}