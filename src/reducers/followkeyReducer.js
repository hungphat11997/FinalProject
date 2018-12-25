import { UPDATE_FOLLOWKEY} from '../actions/updateFollowKey';
export default function followkeyReducer(state = [], action) {

    switch(action.type) {
        case UPDATE_FOLLOWKEY:
        return action.followkey;
        default: 
        return state;
    }
}