import { UPDATE_FOLLOWKEYNAME} from '../actions/updateFollowKeyName';
export default function followkeynameReducer(state = {followkeyname: []}, action) {

    switch(action.type) {
        case UPDATE_FOLLOWKEYNAME:
        return action.followkeyname;
        default: 
        return state;
    }
}