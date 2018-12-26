import { UPDATE_READYTOLOGIN} from '../actions/updateReadyToLogin';
export default function readytologinReducer(state = false, action) {

    switch(action.type) {
        case UPDATE_READYTOLOGIN:
        return action.readytologin;
        default: 
        return state;
    }
}