import { UPDATE_DIALOG2} from '../actions/updateDialog2';
export default function dialog2Reducer(state = false, action) {

    switch(action.type) {
        case UPDATE_DIALOG2:
        return action.dialog2;
        default: 
        return state;
    }
}