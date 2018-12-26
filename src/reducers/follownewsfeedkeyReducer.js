import { UPDATE_FOLLOWNEWSFEEDKEY} from '../actions/updateFollowNewsfeedKey';
export default function follownewsfeedkeyReducer(state = {newsfeedkey: []}, action) {

    switch(action.type) {
        case UPDATE_FOLLOWNEWSFEEDKEY:
        return action.follownewsfeedkey;
        default: 
        return state;
    }
}