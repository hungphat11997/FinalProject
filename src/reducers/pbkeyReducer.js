import { UPDATE_PBKEY} from '../actions/updatePBKey';
export default function pbkeyReducer(state = null, action) {

    switch(action.type) {
        case UPDATE_PBKEY:
        return action.pbkey;
        default: 
        return state;
    }
}